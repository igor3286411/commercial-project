import { useTracker } from "meteor/react-meteor-data";
import { GroupsTime } from "../../api/groupsTime/GroupsTime";
import { GroupTime } from "../types";

export function useGroupsTimeForGroup(sectionId: string | undefined, groupId: string | undefined) {
    const { groupsTime, isGroupsTimeLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('groupsTime');
        const groupsTime = GroupsTime.find({ sectionId: sectionId, groupId: groupId }).fetch() as GroupTime[];
        return { groupsTime, isGroupsTimeLoading: !subscription.ready() };
    });
    return { groupsTime, isGroupsTimeLoading };
}