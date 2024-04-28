import React from "react";

const PaymentsTableThead = () => {
    return (
        <thead>
            <tr>
                <th rowSpan={2}>ФИО</th>
                <th rowSpan={2}>Родитель</th>
                <th rowSpan={2}>Номер родителя</th>
                <th rowSpan={2}>Группа</th>
                <th rowSpan={2}>Дата последней оплаты</th>
                <th rowSpan={2}>Статус оплаты и посещение</th>
            </tr>
        </thead>
    )
}

export default PaymentsTableThead;