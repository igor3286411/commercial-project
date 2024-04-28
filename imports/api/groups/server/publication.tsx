import { Meteor } from 'meteor/meteor';
import { Groups } from '../Groups';

Meteor.publish('groups', function () {
    return Groups.find();
});


