import { useTracker } from 'meteor/react-meteor-data';
import { Students } from '../../api/students/Students';
import { Student } from '../types';

export function useMultipleStudents() {
    const { students, isStudentsLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('students');
        const students = Students.find().fetch() as Student[];
        return { students, isStudentsLoading: !subscription.ready() };
    });
    return { students, isStudentsLoading };
}
