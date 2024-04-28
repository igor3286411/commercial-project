import { Meteor } from 'meteor/meteor';
import { Booking } from '../Booking';

Meteor.publish('booking', function () {
    return Booking.find();
});


