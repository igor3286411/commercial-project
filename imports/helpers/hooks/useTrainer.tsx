import { useTracker } from 'meteor/react-meteor-data';
import { Trainers } from '../../api/trainer/Trainer';
import { Trainer } from '../types';

export function useTrainer(trainerId) {
    const { trainer, isTrainerLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('trainers');
        const trainer = Trainers.findOne({ userId: trainerId }) as Trainer;
        return { trainer, isTrainerLoading: !subscription.ready() };

    });
    return { trainer, isTrainerLoading };
}
