import { Meteor } from "meteor/meteor";
import { Payments } from "../Payments";

Meteor.publish('payments', function () {
    return Payments.find()
})

