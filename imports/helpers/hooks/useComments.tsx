import { useTracker } from 'meteor/react-meteor-data';
import { Comments } from '../../api/comments/Comments';
import { Comment } from '../types';

export function useComments(userType: 'student' | 'trainer', userId: string | undefined) {
    const userTypeId = `${userType}Id`
    const { comments, isCommentsLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('comments');
        const comments = Comments.find({ [userTypeId]: userId }).fetch() as Comment[];
        return { comments, isCommentsLoading: !subscription.ready() };

    });
    return { comments, isCommentsLoading };
}
