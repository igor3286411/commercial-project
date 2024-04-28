import { useTracker } from 'meteor/react-meteor-data';
import { Trainers } from '../../api/trainer/Trainer';
import { Students } from '../../api/students/Students';
import { Parents } from '../../api/parents/Parents';

import { Parent, Trainer } from '../types';

export function useUser(userId: string | undefined) {
    const { user, isUserLoading } = useTracker(() => {
        const collections = [Trainers, Students, Parents];
        let user = null;
        let isUserLoading = false;

        for (const Collection of collections) {
            const subscription = Meteor.subscribe(Collection._name);
            const result = Collection.findOne({ userId: userId });

            if (result) {
                user = result;
                break;
            }
            isUserLoading = !subscription.ready();
        }

        return { user, isUserLoading };
    });

    return { user, isUserLoading };
}