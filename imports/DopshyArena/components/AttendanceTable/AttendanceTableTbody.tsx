import React from "react";
import { useMultipleStudents } from "../../../helpers/hooks/useMultipleStudents";
import { IAttendanceTable } from "./AttendanceTable";
import { AttendanceTableMarkVisit } from "./AttendanceTableMarkVisit";
import { useAttendances } from "../../../helpers/hooks/useAttendances";

export const AttendanceTableTbody: React.FC<IAttendanceTable> = ({ datesInMonth }) => {
    const { students } = useMultipleStudents();
    const { attendances } = useAttendances('students');

    const checkStatus = (date: Date, studentId: string): null | true | false => {
        const foundAttendance = attendances.find(attendance => (
            attendance.date.toDateString() === date.toDateString()
        ))

        if (!foundAttendance) {
            return null
        }
        if (foundAttendance.students.includes(studentId)) {
            return true
        } else {
            return false
        }
    }

    return (
        <tbody>
            {students.map((student, studentIndex) => (
                <tr key={student.userId}>
                    <td>{studentIndex + 1}</td>
                    <td>{student.surname} {student.name}</td>
                    <td>{student.group}{student.subGroup}</td>
                    <td>Вася</td>
                    <td>1234567890</td>
                    {datesInMonth.map((date, dateIndex) => (
                        <AttendanceTableMarkVisit
                            key={dateIndex}
                            date={date}
                            studentId={student.userId}
                            status={checkStatus(date, student.userId)}
                        />
                    ))}
                </tr>
            ))}
        </tbody>
    )
}