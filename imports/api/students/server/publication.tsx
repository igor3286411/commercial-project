import { Meteor } from 'meteor/meteor';
import { Students } from '../Students';

Meteor.publish('students', function () {
    return Students.find();
});

Meteor.publish('students.filterByNameSurname', function (name) {
    return Students.find({ name: name });
});