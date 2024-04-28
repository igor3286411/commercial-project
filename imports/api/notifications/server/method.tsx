import { check, Match } from 'meteor/check';
import { Notifications } from '../Notifications';

Meteor.methods({
    'notifications.insert'(userId, parentId, date, content, type) {
        const dataObj = {
            userId,
            parentId,
            date,
            content,
            type,
            read: false,
            all: false
        }
        Notifications.insert(dataObj);
    },
    'notifications.read'(notifications) {
        notifications.map((notification: any) => {
            Notifications.update(notification._id, { $set: { read: true } })
        })
    },
    'notifications.remove'(notifications) {
        notifications.map((notification: any) => {
            Notifications.remove({})
        })
    }
})

// console.log(Notifications.remove({}))


