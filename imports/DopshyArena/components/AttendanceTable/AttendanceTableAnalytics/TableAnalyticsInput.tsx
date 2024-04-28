import React, { FC } from "react";
import { useTrainer } from "../../../../helpers/hooks/useTrainer";

interface TableAnalyticsInputProps {
    date: Date;
    trainerId: string;
    value: number | string | undefined
}


export const TableAnalyticsInput: FC<TableAnalyticsInputProps> = ({ date, trainerId, value }) => {

    const { trainer } = useTrainer(trainerId);

    const onChangeSearch = (e: any) => {
        if (e.target.value.length <= 1) {
            Meteor.call('attendances.trainer', trainer.userId, trainer.price, date.toDateString(), e.target.value);
        }
    };

    return (
        <td key={date.toLocaleDateString()} className="atendance-table__input" style={{ padding: "0px" }}>
            <input type="number" value={value} onChange={onChangeSearch} />
        </td>
    )
}