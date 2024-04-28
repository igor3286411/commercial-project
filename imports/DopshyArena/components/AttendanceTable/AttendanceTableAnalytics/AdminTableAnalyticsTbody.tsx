import React, { FC } from "react";
import { TableAnalyticsInput } from "./TableAnalyticsInput";
import { Attendance } from "../../../../helpers/types";
import { useAttendancesTrainerAmount } from "../../../../helpers/hooks/useAttendancesTrainerAmount";

interface AdminTableAnalyticsTbodyProps {
    datesInMonth: Date[],
    trainers: any[],
    attendances: Attendance[],
}

export const AdminTableAnalyticsTbody: FC<AdminTableAnalyticsTbodyProps> = ({ datesInMonth, trainers, attendances }) => {

    const total = (trianerId: string, amount: string) => {
        const { amountLessons } = useAttendancesTrainerAmount(trianerId, amount);
        return amountLessons
    }

    return (
        <>
            {trainers.map((trainerName, trainerIndex) => {
                return (
                    <tr key={trainerName.userId}>
                        <td>{trainerIndex + 1}</td>
                        <td>{trainerName.surname} {trainerName.name}</td>
                        <td>{trainerName.price}</td>
                        {datesInMonth.map((date) => {
                            const attendanceForDate = attendances.find(attendance => attendance.date.toString() === date.toDateString()
                                && attendance.trainerId === trainerName.userId);
                            return (
                                <TableAnalyticsInput
                                    key={date.toDateString()}
                                    date={date}
                                    trainerId={trainerName.userId}
                                    value={attendanceForDate ? attendanceForDate.value : ''}
                                />
                            );
                        })}
                        <td>{total(trainerName.userId, 'amount')}</td>
                        <td>{trainerName.price * total(trainerName.userId, 'amount')}</td>
                        {/* <td>000000</td> */}
                    </tr>
                );
            })}
        </>
    );
}