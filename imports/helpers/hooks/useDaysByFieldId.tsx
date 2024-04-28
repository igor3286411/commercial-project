import { useTracker } from "meteor/react-meteor-data";
import { Fields } from "../../api/fields/Fields";
import { Schedule } from "../types";

export function useDaysByFieldId(fieldId: string | undefined) {
    const { days, isDaysLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('fields');
        const days = Fields.findOne({ fieldId })?.schedule as Schedule[];
        return { days, isDaysLoading: !subscription.ready() };
    });
    return { days, isDaysLoading };
}