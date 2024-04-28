import { useTracker } from 'meteor/react-meteor-data';
import { Notifications } from '../../api/notifications/Notifications';
import { Notification } from '../types';

export function useNotifications() {
    const { notifications, isNotificationsLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('notifications');
        const notifications = Notifications.find().fetch() as Notification[];
        return { notifications, isNotificationsLoading: !subscription.ready() };

    });
    return { notifications, isNotificationsLoading };
}
