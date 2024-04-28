import { check } from "meteor/check"
import { Fields } from "../Fields"

Meteor.methods({
    'fields.insert'(fieldObj) {
        // check(fieldObj, {
        //     name: String,
        //     info: String

        // })
        Fields.insert(fieldObj)
    },
    'fields.edit'(fieldId, newData) {
        const field = Fields.findOne({ fieldId })

        if (field) {
            Fields.update(field._id, { $set: newData })
        }
    }
})

// console.log(Fields.remove({}))