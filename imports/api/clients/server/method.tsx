import { check, Match } from 'meteor/check';
import { Clients } from '../Clients';

Meteor.methods({
    'clients.insert'(client) {
        // check(bookedDays, Match.Where((x) => Array.isArray(x)));
        // const bookedObj = { booked: bookedDays }
        Clients.insert(client);
    }
})

// console.log(Clients.findOne({}));
