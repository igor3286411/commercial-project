import { useTracker } from 'meteor/react-meteor-data';
import { Payments } from '../../api/payments/Payments';
import { Payment } from '../types';

export function usePayments(userId?: string) {
    const { payments, isPaymentsLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('payments');
        const payments = userId ?
            Payments.find({ userId: userId }).fetch() as Payment[]
            :
            Payments.find().fetch() as Payment[];
        return { payments, isPaymentsLoading: !subscription.ready() };

    });
    return { payments, isPaymentsLoading };
}
