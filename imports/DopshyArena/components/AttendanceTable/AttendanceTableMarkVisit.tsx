import React, { useState, FC } from "react";

interface AttendanceTableMarkVisitProps {
    date: Date;
    studentId: string;
    status: null | true | false;
}


export const AttendanceTableMarkVisit: FC<AttendanceTableMarkVisitProps> = ({ date, studentId, status = null }) => {
    const [markClick, setMarkClick] = useState(status)
    const handleClick = (idClick: true | false) => {
        setMarkClick(idClick)

    }

    const handleMeteorCall = () => {
        const markClickBoolean = markClick === true ? false : true;
        Meteor.call('attendances.insert', studentId, date, markClickBoolean);
    }

    return (
        <td key={date.toLocaleDateString()} className="atendance-table__mark-visit"
            onClick={() => {
                handleClick(markClick === true ? false : true);
                handleMeteorCall();
            }}>
            {status === null ? "" : status === true ? "✔️" : "❌"}
        </td>
    )
}