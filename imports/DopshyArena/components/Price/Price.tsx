import React, { useEffect, useState } from "react";
import { usePrice } from "../../../helpers/hooks/usePrice";

interface IPriceProps {
    hours: number;
    date: Date;
    fieldId: string;
}

const Price: React.FC<IPriceProps> = ({ hours, date, fieldId }) => {

    const { price } = usePrice();

    const currentField = price.filter(item => item.fieldId === fieldId)

    function priceChanges() {
        if (currentField.length > 0) {
            let resultSpan;
            currentField.map(item => {
                if (item?.startDate <= date && item?.endDate >= date) {
                    if (hours >= item?.startTime && hours <= item?.endTime) {
                        resultSpan = <span>{item?.resultPrice}</span>;
                        return true;
                    }
                }
                return false;
            });

            if (resultSpan) {
                return resultSpan;
            } else {
                return <span>10.000 тг</span>;
            }
        } else {
            return <span>10.000 тг</span>;
        }

    }

    return (
        <div>{priceChanges()}</div>
    );
}

export default Price;
