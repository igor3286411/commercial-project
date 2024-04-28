import { useTracker } from 'meteor/react-meteor-data';
import { Parents } from '../../api/parents/Parents';
import { Parent } from '../types';

export function useParent(parentId: string | undefined) {
    const { parent, isParentLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('parents');
        const parent = Parents.findOne({ userId: parentId }) as Parent;
        return { parent, isParentLoading: !subscription.ready() };
    });
    return { parent, isParentLoading };
}
