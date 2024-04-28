import { Random } from "meteor/random";
import { GroupsTime } from "../GroupsTime";

Meteor.methods({
    'groupsTime.insert'(sectionId, groupId, groupTimeName) {
        const groupTimeData = {
            groupTimeId: Random.id(),
            sectionId,
            groupId,
            groupTimeName
        }

        GroupsTime.insert(groupTimeData);
    },
})

// console.log(GroupsTime.findOne({}))