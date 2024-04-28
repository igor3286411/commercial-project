import { Meteor } from "meteor/meteor";
import { Notifications } from "../Notifications";

Meteor.publish('notifications', function () {
    return Notifications.find()
})

