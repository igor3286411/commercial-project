import { Meteor } from 'meteor/meteor';
import { Trainers } from '../Trainer';

Meteor.publish('trainers', function () {
    return Trainers.find();
});