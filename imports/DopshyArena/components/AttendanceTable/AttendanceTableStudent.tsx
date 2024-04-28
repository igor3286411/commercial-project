import React, { FC } from "react"
import { useAttendances } from "../../../helpers/hooks/useAttendances"

interface AttendanceTableStudentProps {
    studentId: string;
}

export const AttendanceTableStudent: FC<AttendanceTableStudentProps> = ({ studentId }) => {

    const { attendances } = useAttendances('students')

    return (
        <div className="attendance-table-student">
            <h2>История посещаемости</h2>
            <table className="table table-bordered border-primary">
                <tbody>
                    {attendances.map((student) => (
                        <tr key={student.date.toLocaleDateString()}>
                            <td>{student.date.toLocaleDateString()}</td>
                            <td>{student.students.includes(studentId) ? "Посетил" : "Пропуск"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}