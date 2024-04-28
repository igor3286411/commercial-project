import { check, Match } from 'meteor/check';
import { Attendances } from '../Attendance';

Meteor.methods({
    'attendances.insert'(studentId, date, mark) {
        const data = {
            students: [studentId],
            date
        }
        const attendance = Attendances.findOne({ date: date })

        if (attendance) {
            mark ?
                Attendances.update(attendance._id, { $push: { students: studentId } })
                :
                Attendances.update(attendance._id, { $pull: { students: studentId } });
        } else {
            Attendances.insert(data);
        }
    },
    'attendances.trainer'(trainerId, price, date, value) {

        const data = {
            trainerId,
            price,
            date,
            value
        }

        const attendance = Attendances.findOne({ trainerId, date })

        if (attendance) {
            Attendances.update(attendance._id, { $set: { value } })
        } else {
            Attendances.insert(data);
        }

    }
})

// console.log(Attendances.remove({}));
