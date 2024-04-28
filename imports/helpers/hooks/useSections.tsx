import { useTracker } from "meteor/react-meteor-data";
import { Sections } from "../../api/sections/Sections";
import { Section } from "../types";

export function useSections() {
    const { sections, isSectionsLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('sections');
        const sections = Sections.find().fetch() as Section[];
        return { sections, isSectionsLoading: !subscription.ready() };
    });
    return { sections, isSectionsLoading };
}