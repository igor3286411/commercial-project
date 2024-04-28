import { Meteor } from 'meteor/meteor';
import { Fields } from '../Fields';

Meteor.publish('fields', function () {
    return Fields.find();
});