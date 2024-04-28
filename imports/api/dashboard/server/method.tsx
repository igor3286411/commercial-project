import { Dashboard } from "../Dashboard";

Meteor.methods({
    'dashboard.insert'(object, userId?) {

        const dashboard = Dashboard.findOne({ 'parentData.userId': userId })

        if (dashboard) {
            Dashboard.update(dashboard._id, { $set: { ...object } })
        } else {
            Dashboard.insert(object)
        }
    }
})