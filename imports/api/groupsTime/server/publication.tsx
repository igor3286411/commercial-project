import { Meteor } from 'meteor/meteor';
import { GroupsTime } from '../GroupsTime';

Meteor.publish('groupsTime', function () {
    return GroupsTime.find();
});


