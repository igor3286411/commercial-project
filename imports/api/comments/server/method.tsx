import { Comments } from "../Comments";

Meteor.methods({
    'comments.insert'(studentId, trainerId, date, comment) {
        const commentObj = {
            studentId,
            trainerId,
            date,
            comment
        }
        Comments.insert(commentObj)
    },
    'comments.edit'(commentId, newComment) {
        const comment = Comments.findOne({ _id: commentId })
        if (comment) {
            Comments.update(comment._id, { $set: { comment: newComment } })
        }
    }
})

// console.log(Comments.remove({}))
// console.log(Comments.findOne({}))