import { useTracker } from "meteor/react-meteor-data";
import { Groups } from "../../api/groups/Groups";
import { Group } from "../types";

export function useGroupsForSection(sectionId: string | undefined) {
    const { groups, isGroupsLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('groups');
        const groups = Groups.find({ sectionId }).fetch() as Group[];
        return { groups, isGroupsLoading: !subscription.ready() };
    });
    return { groups, isGroupsLoading };
}