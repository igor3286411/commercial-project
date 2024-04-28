import React, { FC } from "react";
import { useMultipleTrainers } from "../../../../helpers/hooks/useMultipleTrainers";
import { useTrainer } from "../../../../helpers/hooks/useTrainer";
import { AdminTableAnalyticsTbody } from "./AdminTableAnalyticsTbody";
import { TableTrainerAnalyticsTbody } from "./TableTrainerAnalyticsTbody";
import { Attendance } from "../../../../helpers/types";

interface TableAnalyticsTbodyProps {
    datesInMonth: Date[];
    attendances: Attendance[];
}

export const TableAnalyticsTbody: FC<TableAnalyticsTbodyProps> = ({ datesInMonth, attendances }) => {
    const { trainers } = useMultipleTrainers();
    const user = Meteor.user();
    const { trainer } = useTrainer(user?._id)
    
    return (
        <tbody>
            {trainer ? 
            <TableTrainerAnalyticsTbody datesInMonth={datesInMonth} trainer={trainer} attendances={attendances}/> : 
            <AdminTableAnalyticsTbody datesInMonth={datesInMonth} trainers={trainers} attendances={attendances}/>}
        </tbody>
    )
}