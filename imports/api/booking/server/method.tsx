import { check, Match } from 'meteor/check';
import { Booking } from '../Booking';

Meteor.methods({
    'booking.insert'(bookedDays) {
        // check(bookedDays, Match.Where((x) => Array.isArray(x)));
        // const bookedObj = { booked: bookedDays }
        console.log(bookedDays)
        Booking.insert(bookedDays);
    }
})


// console.log(Booking.remove({}))