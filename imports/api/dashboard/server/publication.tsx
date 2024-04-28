import { Dashboard } from "../Dashboard";

Meteor.publish('dashboard', function () {
    return Dashboard.find();
})