import { Parents } from "../Parents";
import { check } from "meteor/check";

Meteor.methods({
    'parents.insert'(parentsObj, studentObj) {
        const userId = Accounts.createUser({
            username: parentsObj.email,
            password: parentsObj.email,
            profile: {
                name: parentsObj.name,
                surname: parentsObj.surname,
                email: parentsObj.email,
                phone: parentsObj.phone,
                iin: parentsObj.iin,
                userId: parentsObj.userId,
                childrenUserId: [studentObj.userId],
                userType: 'parent'
            }
        });

        const parentsDate = {
            name: parentsObj.name,
            surname: parentsObj.surname,
            email: parentsObj.email,
            phone: parentsObj.phone,
            iin: parentsObj.iin,
            userId: parentsObj.userId,
            childrenUserId: [studentObj.userId],
            userType: 'parent'
        }

        console.log('Пользователь успешно создан. ID:', userId);
        Parents.insert(parentsDate)
    },
    'parent.edit'(parentId, newData) {
        const parent = Parents.findOne({ userId: parentId })
        if (parent) {
            Parents.update(parent._id, { $set: newData })
        }
    },
    'parents.addChild'(parentId, newChildUserId) {
        const parent = Parents.findOne({ userId: parentId })
        if (parent) {
            Parents.update(parent._id, { $push: { childrenUserId: newChildUserId } })
        }
    }
})

// console.log(Parents.remove({}))
// console.log(Parents.findOne({}))
// console.log(Meteor.users.remove({}))