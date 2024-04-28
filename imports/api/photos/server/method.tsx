import { Photos } from "../Photos";
import { check } from "meteor/check";

Meteor.methods({
    'photos.insert'(photoObj) {

        const photo = Photos.findOne({ id: photoObj.id })

        if (photo) {
            Photos.update(photo._id, { $set: { imageSrc: photoObj.imageSrc } })
        } else {
            Photos.insert(photoObj)
        }
    }
})

// console.log(Photos.remove({}))