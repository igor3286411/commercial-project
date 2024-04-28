import { useTracker } from 'meteor/react-meteor-data';
import { Students } from '../../api/students/Students';
import { Student } from '../types';

export function useStudent(studentId: string | undefined) {
    const { student, isStudentLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('students');
        const student = Students.findOne({ userId: studentId }) as Student;
        return { student, isStudentLoading: !subscription.ready() };

    });
    return { student, isStudentLoading };
}
