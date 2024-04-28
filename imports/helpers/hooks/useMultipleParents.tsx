import { useTracker } from 'meteor/react-meteor-data';
import { Parents } from '../../api/parents/Parents';
import { Parent } from '../types';

export function useMultipleParents() {
    const { parents, isParentsLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('parents');
        const parents = Parents.find().fetch() as Parent[];
        return { parents, isParentsLoading: !subscription.ready() };
    });
    return { parents, isParentsLoading };
}
