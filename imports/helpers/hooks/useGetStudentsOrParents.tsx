import { useTracker } from 'meteor/react-meteor-data';
import { Students } from '../../api/students/Students';
import { Student } from '../types';
import { Parents } from '../../api/parents/Parents';
import { Parent } from '../types';

type UserType = "parent" | "student";

export function useGetStudentsOrParents(userType: UserType, userId: string) {
    const { data, isDataLoading } = useTracker(() => {
        const subscription = Meteor.subscribe(userType === 'parent' ? 'parents' : 'students');
        const data = userType === 'parent' ? Parents.findOne({ childrenUserId: userId }) as Parent :
            Students.find({ parentUserId: userId }).fetch() as Student[];
        return { data, isDataLoading: !subscription.ready() };
    });
    return { data, isDataLoading };
}
