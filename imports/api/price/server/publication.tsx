import { Meteor } from 'meteor/meteor';
import { Price } from '../Price';

Meteor.publish('price', function () {
    return Price.find();
});