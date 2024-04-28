import React from "react";

import { IAttendanceTable } from "./AttendanceTable";

export const AttendanceTableThead: React.FC<IAttendanceTable> = ({ datesInMonth }) => {

    return (
        <thead>
            <tr>
                <th rowSpan={2}>№</th>
                <th rowSpan={2}>ФИО</th>
                <th rowSpan={2}>ГРУППА</th>
                <th rowSpan={2}>Имя родителя</th>
                <th rowSpan={2}>Телефон родителя</th>
                {datesInMonth?.map((day, i) => (
                    <th className="atendance-table__thead-th" key={i}>{day?.getDate() < 10 ? `0${day?.getDate()}` : day?.getDate()}</th>
                ))}
            </tr>
            <tr>
                {datesInMonth?.map((day, i) => (
                    <th className="atendance-table__thead-th" key={i}>{day?.getMonth() + 1 < 10 ? `0${day?.getMonth() + 1}` : day?.getMonth() + 1}</th>
                ))}
            </tr>
        </thead>

    )
}