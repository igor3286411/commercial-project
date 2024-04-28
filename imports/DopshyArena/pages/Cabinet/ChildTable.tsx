import React, { FC } from 'react'
import { Table } from '@gravity-ui/uikit'
import { usePayments } from '../../../helpers/hooks/usePayments'
import { Spin } from '@gravity-ui/uikit'

const ChildTable: FC = () => {

    const { payments, isPaymentsLoading } = usePayments()

    const paymentDates = payments.map(payment => payment.date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }));// [Thu Feb 29 2024 16:54:58 GMT+0300 (Москва, стандартное время), Thu Feb 29 2024 16:55:10 GMT+0300 (Москва, стандартное время)]
    const lastPayment = payments.map(payment => payment.paymentNumber); //['100', '200']
    const dutyPayment = [400, 500]; // нужна будет функция для определения задолженности либо готовое поле

    const headers = ['id', 'Дата', 'Сумма последнего платежа', 'Сумма задолженности']

    const columns = [];
    for (let i = 0; i < headers.length; i++) {
        const object = { id: headers[i] }; columns.push(object);
    }

    const newData = [];
    for (let i = 0; i < payments.length; i++) {
        newData.push({
            id: i + 1,
            [headers[1]]: paymentDates[i],
            [headers[2]]: lastPayment[i],
            [headers[3]]: dutyPayment[i]
        });
    }

    return (
        <>
            {
                !isPaymentsLoading ? <div className='container'>
                    <Table data={newData}
                        columns={columns} />
                </div> : <div className='container'><Spin /></div>
            }
        </>
    )
}

export default ChildTable