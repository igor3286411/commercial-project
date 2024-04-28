import { useTracker } from 'meteor/react-meteor-data';
import { Clients } from '../../api/clients/Clients';
import { Client } from '../types';

export function useMultipleClients() {
    const { clients, isClientsLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('clients');
        const clients = Clients.find().fetch() as Client[];
        return { clients, isClientsLoading: !subscription.ready() };
    });
    return { clients, isClientsLoading };
}
