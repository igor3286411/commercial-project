import { check, Match } from 'meteor/check';
import { Trainers } from '../Trainer';
import { Sections } from '../../../helpers/types';

Meteor.methods({
    'trainers.insert'(trainersObj) {
        const userId = Accounts.createUser({
            username: trainersObj.email,
            password: trainersObj.email,
            profile: {
                name: trainersObj.name,
                surname: trainersObj.surname,
                email: trainersObj.email,
                phone: trainersObj.phone,
                userId: trainersObj.userId,
                userType: 'trainer'
            }
        });

        console.log('Пользователь успешно создан. ID:', userId);
        Trainers.insert(trainersObj);
    },
    'trainers.toGroup'(trainerId, section, field, days, group, index) {
        const trainer = Trainers.findOne({ userId: trainerId });

        const data = {
            sectionName: section,
            fieldName: field,
            days: days,
            groupName: group
        }

        const dataNull = {
            sectionName: null,
            fieldName: null,
            days: null,
            groupName: null
        }



        if (trainer) {

            const currentSectionIndex = trainer?.sections.findIndex((section: Sections, i: number) => i === index);

            if (currentSectionIndex !== -1) {
                const updatedSections = trainer.sections.map((section, i) => {
                    if (i === currentSectionIndex) {
                        return data;
                    }
                    return section;
                });

                const checkNullInData = (data: { [key: string]: any }) => {
                    for (let key in data) {
                        if (data[key] === null) {
                            return key;
                        }
                    }
                };

                const result = checkNullInData(data)

                if (result) {
                    Trainers.update(
                        { _id: trainer._id },
                        {
                            $set: {
                                sections: updatedSections
                            }
                        }
                    );
                } else {
                    if (trainer.sections.length - 1 === currentSectionIndex) {
                        Trainers.update(
                            { _id: trainer._id },
                            {
                                $set: {
                                    sections: [...updatedSections, dataNull]
                                }
                            }
                        );
                    }
                }

            } else {
                Trainers.update(trainer._id, { $push: { sections: data } });
            }
        }
    },
    'trainer.edit'(trainerId, newData) {
        const trainer = Trainers.findOne({ userId: trainerId })
        if (trainer) {
            Trainers.update(trainer._id, { $set: newData })
        }
    }
})

// console.log(Trainers.remove({}))
// console.log(Trainers.findOne({_id: 'pN7RDiPGyDamxwdQH'}))