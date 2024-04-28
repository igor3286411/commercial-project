import { Meteor } from 'meteor/meteor';
import { Parents } from '../Parents';

Meteor.publish('parents', function () {
    return Parents.find();
});