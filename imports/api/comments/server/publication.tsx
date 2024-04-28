import { Comments } from "../Comments";

Meteor.publish('comments', function () {
    return Comments.find();
})