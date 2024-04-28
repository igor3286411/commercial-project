import { useTracker } from "meteor/react-meteor-data";
import { Trainers } from "../../api/trainer/Trainer";
import { Trainer } from "../types";

export function useMultipleTrainers() {
    const { trainers, isTrainersLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('trainers');
        const trainers = Trainers.find().fetch() as Trainer[];
        return { trainers, isTrainersLoading: !subscription.ready() };
    });
    return { trainers, isTrainersLoading };
}