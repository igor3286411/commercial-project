import { Random } from "meteor/random";
import { Groups } from "../Groups";

Meteor.methods({
    'groups.insert'(sectionId, groupName) {
        const groupData = {
            groupId: Random.id(),
            sectionId,
            groupName,
        }

        Groups.insert(groupData);
    },
})

// console.log(Groups.remove({}))