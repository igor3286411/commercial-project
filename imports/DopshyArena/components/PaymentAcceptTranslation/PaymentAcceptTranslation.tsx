import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { PopupModal } from "../PopupModal/PopupModal";
import { usePayments } from "../../../helpers/hooks/usePayments";
import Swal from 'sweetalert2'
import { Payment } from "../../../helpers/types";

const PaymentAcceptTranslation = () => {

    //@ts-ignore
    const userId = Meteor.user()?.profile?.userid

    const { payments } = usePayments(userId);
    const [paidNumber, setPaidNumber] = useState('');
    const [currentPayment, setCurrentPayment] = useState<Payment | null>(null);

    const [show, setShow] = useState(false);

    const openModal = (payment: Payment) => {
        setShow(true)
        setCurrentPayment(payment)
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        state: React.Dispatch<React.SetStateAction<string>>) => {

        state(e.target.value)
    }

    const closeModal = () => {
        setShow(false);
        setPaidNumber('')
    }

    const handlePaid = () => {
        if (paidNumber && paidNumber !== '0' && currentPayment) {
            Meteor.call('payments.paid', currentPayment._id, paidNumber, currentPayment.paymentNumber,
                (err: object) => {
                    if (err) {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Произошла ошибка',
                            icon: 'error',
                        });
                    } else {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Оплата прошла успешно',
                            icon: 'success',
                            confirmButtonText: 'Cool',
                        });
                    }

                })
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Введите корректную сумму',
                icon: 'error',
            });
        }
    }

    return (
        <Table>
            <PopupModal
                show={show}
                onHide={closeModal}
                content={
                    <div>
                        <input type="number" value={paidNumber} onChange={(e) => handleChange(e, setPaidNumber)} />
                        <Button onClick={handlePaid}>Оплатить</Button>
                    </div>
                }
                title={'Оплатить'}
                closeButton={true}
            />
            <thead>
                <tr>
                    <th>Дата</th>
                    <th>Сумма последнего платежа</th>
                    <th>Сумма задолжности</th>
                </tr>
            </thead>
            <tbody>
                {payments.map(payment => (
                    <tr>
                        <td>{payment?.date?.toLocaleDateString()}</td>
                        <td>{payment?.paymentNumber}</td>
                        <td>{payment?.residual}</td>
                        <td><Button onClick={() => openModal(payment)}>Оплатить</Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default PaymentAcceptTranslation;