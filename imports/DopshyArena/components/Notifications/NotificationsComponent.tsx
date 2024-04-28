import React from 'react';
//@ts-ignore
import Notifications from 'react-notifications-menu'
import { useNotifications } from '../../../helpers/hooks/useNotifications';

import './Notifications.scss';

const NotificationsComponent = () => {
    //@ts-ignore
    const userId = Meteor.user()?.profile?.userId;

    const { notifications } = useNotifications();

    const notificationFilter = notifications.filter(notification => notification.userId === userId ||
        notification.parentId === userId);

    const data = notificationFilter.map(notification => ({
        message: notification?.content,
        image: "/payment-icon.png"
    })).reverse();

    const notificationsRemove = () => {
        //@ts-ignore
        Meteor.call('notifications.remove', notificationFilter)
    }

    return (
        <div style={{ width: '50px', display: 'flex' }}>
            <Notifications
                header={{
                    title: 'Уведомления',
                    option: { text: 'Очистить уведомления', onClick: () => notificationsRemove() },
                }}
                // icon="notification.svg"
                data={data}
            />
        </div>
    )

}

export default NotificationsComponent;