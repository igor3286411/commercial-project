import { Meteor } from 'meteor/meteor';
import { Photos } from '../Photos';

Meteor.publish('photos', function () {
    return Photos.find();
});