import { useTracker } from "meteor/react-meteor-data";
import { Fields } from "../../api/fields/Fields";
import { Field } from "../types";

export function useFields() {
    const { fields, isFieldsLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('fields');
        const fields = Fields.find().fetch() as Field[];
        return { fields, isFieldsLoading: !subscription.ready() };
    });
    return { fields, isFieldsLoading };
}