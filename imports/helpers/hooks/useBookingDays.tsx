import { useTracker } from "meteor/react-meteor-data";
import { Booking } from "../../api/booking/Booking";
import { Booked } from "../types";

export function useBooking() {
    const { booking, isBookingLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('booking');
        const booking = Booking.find().fetch() as Booked[];
        return { booking, isBookingLoading: !subscription.ready() };
    });
    return { booking, isBookingLoading };
}