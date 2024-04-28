import { useTracker } from 'meteor/react-meteor-data';
import { Attendances } from '../../api/attendance/Attendance';
import { Attendance } from '../types';

export function useAttendancesTrainerAmount(trainerId: string, amount: string) {
    const { amountLessons, isAmountLessonLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('attendances.trainerAmount', trainerId);

        const attendancesAmount = Attendances.find({ trainerId }).fetch() as Attendance[];

        const amountLessons = attendancesAmount.reduce((previousValue, currentValue) => {
            return Number(previousValue) + Number(currentValue.value);
        }, 0)
        return { amountLessons, isAmountLessonLoading: !subscription.ready() };

    });
    return { amountLessons, isAmountLessonLoading };
}
