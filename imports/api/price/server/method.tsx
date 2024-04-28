import { check, Match } from 'meteor/check';
import { Price } from '../Price';

Meteor.methods({
    'price.insert'(priceObj) {
        Price.insert(priceObj);
        console.log(priceObj)
    }
})

// console.log(Price.remove({}))