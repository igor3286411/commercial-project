import React, { useState } from "react";
import { TableAnalyticsThead } from "./TableAnalyticsThead";
import { TableAnalyticsTbody } from "./TableAnalyticsTbody";
import { useAttendances } from "../../../../helpers/hooks/useAttendances";

export const AttendanceTableAnalytics = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const { attendances, isAttendancesLoading } = useAttendances('trainers');

    const getWeekDays = () => {
        const days = [];
        const currentDateCopy = new Date(currentDate);
        const currentDayOfWeek = currentDateCopy.getDay();
        currentDateCopy.setDate(currentDate.getDate() - currentDayOfWeek + 1);

        for (let i = 0; i < 7; i++) {
            const day = new Date(currentDateCopy);
            day.setDate(currentDateCopy.getDate() + i);
            days.push(day);
        }

        return days;
    };

    const previousWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentDate(newDate);
    };

    const nextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentDate(newDate);
    };

    const weekDays = getWeekDays();
    const weekDaysLength = weekDays.length

    const weekDaysStartandEnd = (start: Date, end: Date) => {
        const startDay: string | number = start.getDate() < 10 ? `0${start.getDate()}` : start.getDate()
        const startMonth: string | number = start.getMonth() + 1 < 10 ? `0${start.getMonth() + 1}` : start.getMonth() + 1
        const endDay: string | number = end.getDate() < 10 ? `0${end.getDate()}` : end.getDate()
        const endMonth: string | number = end.getMonth() + 1 < 10 ? `0${end.getMonth() + 1}` : end.getMonth() + 1
        const dataFinish: string = `${startDay}.${startMonth} - ${endDay}.${endMonth}`
        return dataFinish
    }
    if (!isAttendancesLoading) {
        return (
            <div className="attendance-table__analytics">
                <div className="attendance-table__text">
                    <h2>Посещаемость тренеров </h2>
                    <h2>{weekDaysStartandEnd(weekDays[0], weekDays[weekDaysLength - 1])}</h2>
                </div>
                <table className="table table-bordered border-primary">
                    <TableAnalyticsThead datesInMonth={weekDays} />
                    <TableAnalyticsTbody datesInMonth={weekDays} attendances={attendances} />
                </table>
                <div className="attendance-table-data-next-and-back">
                    <button onClick={previousWeek} className="btn btn-light">Предыдущая неделя</button>
                    <button onClick={nextWeek} className="btn btn-light">Следующая неделя</button>
                </div>
            </div>
        )
    }
}