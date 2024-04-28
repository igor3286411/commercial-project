import { useTracker } from 'meteor/react-meteor-data';
import { Attendances } from '../../api/attendance/Attendance';
import { Attendance } from '../types';

export function useAttendances(userType: 'trainers' | 'students') {
    const { attendances, isAttendancesLoading } = useTracker(() => {
        const subscription = userType === 'students' ? Meteor.subscribe('attendances.students') :
            Meteor.subscribe('attendances.trainers');
        const attendances = Attendances.find().fetch() as Attendance[];
        return { attendances, isAttendancesLoading: !subscription.ready() };

    });
    return { attendances, isAttendancesLoading };
}
