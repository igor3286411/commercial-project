import React, { useState } from "react"
import { AttendanceTableTbody } from "./AttendanceTableTbody"
import { AttendanceTableThead } from "./AttendanceTableThead"
import "./AttendanceTable.scss"
import { useStudent } from "../../../helpers/hooks/useStudent";
import { AttendanceTableStudent } from "./AttendanceTableStudent";

export interface IAttendanceTable {
    datesInMonth: Date[];
}

export const AttendanceTable = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const user = Meteor.user();
    const { student } = useStudent(user?._id);

    const handlePreviousMonth = () => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });
    };

    const handleNextMonth = () => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });
    };

    const getDatesInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const dates = [];
        for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d));
        }
        return dates;
    };

    const datesInMonth = getDatesInMonth(currentDate);

    if (student) {
        return <AttendanceTableStudent studentId={student.userId} />
    }

    return (
        <div>
            <div className="attendance-table__text">
                <h2>Посещаемость за {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
            </div>
            <div className="attendance-table">
                <table className="table table-bordered border-primary">
                    <AttendanceTableThead datesInMonth={datesInMonth} />
                    <AttendanceTableTbody datesInMonth={datesInMonth} />
                </table>
            </div>
            <div className="attendance-table-data-next-and-back">
                <button onClick={handlePreviousMonth} className="btn btn-light">Предыдущая страница</button>
                <button onClick={handleNextMonth} className="btn btn-light">Следующая страница</button>
            </div>
        </div>
    )
}