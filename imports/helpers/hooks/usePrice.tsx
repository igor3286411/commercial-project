import { useTracker } from "meteor/react-meteor-data";
import { Price } from "../../api/price/Price";
import { TPrice } from "../types";

export function usePrice() {
    const { price, isPriceLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('price');
        const price = Price.find().fetch() as TPrice[];
        return { price, isPriceLoading: !subscription.ready() };
    });
    return { price, isPriceLoading };
}