import { Meteor } from 'meteor/meteor';
import { Clients } from '../Clients';

Meteor.publish('clients', function () {
    return Clients.find();
});