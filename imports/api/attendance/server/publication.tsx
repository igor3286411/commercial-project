import { Meteor } from "meteor/meteor";
import { Attendances } from "../Attendance";

Meteor.publish('attendances', function () {
    return Attendances.find();
})

Meteor.publish('attendances.students', function () {
    return Attendances.find({ value: { $exists: false } });
})

Meteor.publish('attendances.trainers', function () {
    return Attendances.find({ value: { $exists: true } });
});

Meteor.publish('attendances.trainerAmount', function (trainerId) {
    return Attendances.find({ trainerId: trainerId });
});