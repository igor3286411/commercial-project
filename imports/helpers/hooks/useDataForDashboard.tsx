import { useTracker } from "meteor/react-meteor-data";
import { Dashboard } from "../../api/dashboard/Dashboard";
import { IDashboard } from "../types";

export function useDataForDashboard() {
    const { dataForDashboard, isDataForDashboardLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('dashboard');
        const dataForDashboard = Dashboard.find().fetch() as IDashboard[];
        return { dataForDashboard, isDataForDashboardLoading: !subscription.ready() };
    });
    return { dataForDashboard, isDataForDashboardLoading };
}