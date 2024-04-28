import { check, Match } from 'meteor/check';
import { Random } from 'meteor/random';
import { Sections } from '../Sections';

Meteor.methods({
    'sections.insert'(sectionName, newSection) {

        const sectionData = {
            sectionId: Random.id(),
            sectionName
        }

        Sections.insert(sectionData);
    },
    'sections.remove'(sectionData) {


        const section = Sections.findOne({ section: sectionData.section })

        if (section) {
            if (sectionData.group) {
                const group = section?.groups?.find((group: any) => group.groupName === sectionData.group);
                if (group) {
                    const subGroupIndex = group.subGroupName.findIndex(subGroup => subGroup === sectionData.subGroup);
                    if (subGroupIndex !== -1) {
                        group.subGroupName.splice(subGroupIndex, 1);
                    } else {
                        const groupIndex = section.groups.findIndex(group => group === sectionData.group);
                        section.groups.splice(groupIndex, 1);
                    }

                }
            } else {
                Sections.remove(section._id);
            }
            Sections.update(section._id, { $set: section });
        }
    }
})

// console.log(Sections.remove({}));
