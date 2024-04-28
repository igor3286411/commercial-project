import React, {FC} from "react";
import { IAttendanceTable } from "../AttendanceTable";

export const TableAnalyticsThead: FC<IAttendanceTable> = ({datesInMonth}) => {
    return (
        <thead>
            <tr>
                <th rowSpan={2}>№</th>
                <th rowSpan={2}>ФИ</th>
                <th rowSpan={2}>Цена</th>
                {datesInMonth?.map((day, i) => (
                    <th className="atendance-table__thead-th" key={i}>{day?.getDate() < 10 ? `0${day?.getDate()}` : day?.getDate()}</th>
                ))}
                <th rowSpan={2}>Общее кол-во </th>
                <th rowSpan={2}>Общая сумма (мес)</th>
                <th rowSpan={2}>Комментарий</th>
            </tr>
            <tr>
                {datesInMonth?.map((day, i) => (
                    <th className="atendance-table__thead-th" key={i}>{day?.getMonth() + 1 < 10 ? `0${day?.getMonth() + 1}` : day?.getMonth() + 1}</th>
                ))}
            </tr>
        </thead>
    )
}