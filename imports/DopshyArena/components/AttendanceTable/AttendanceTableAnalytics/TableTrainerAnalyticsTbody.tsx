import React, { FC } from "react";
import { Attendance } from "../../../../helpers/types";
import { useAttendancesTrainerAmount } from "../../../../helpers/hooks/useAttendancesTrainerAmount";

interface TableTrainerAnalyticsTbodyProps {
    datesInMonth: Date[],
    trainer: any,
    attendances: Attendance[],
}

export const TableTrainerAnalyticsTbody: FC<TableTrainerAnalyticsTbodyProps> = ({ datesInMonth, trainer, attendances }) => {

    const total = (trianerId: string, amount: string) => {
        const { amountLessons } = useAttendancesTrainerAmount(trianerId, amount);
        return amountLessons
    }
    return (
        <>
            <tr key={trainer.userId}>
                <td>1</td>
                <td>{trainer.surname} {trainer.name}</td>
                <td>5000</td>
                {datesInMonth.map((date) => {
                    const attendanceForDate = attendances.find(attendance => attendance.date.toString() === date.toDateString()
                        && attendance.trainerId === trainer.userId);
                    return (<td align="center">{attendanceForDate ? attendanceForDate.value : ''}</td>);
                })}
                <td>{total(trainer.userId, 'amount')}</td>
                <td>{trainer.price * total(trainer.userId, 'amount')}</td>
                {/* <td>000000</td> */}
            </tr>
        </>
    )
}