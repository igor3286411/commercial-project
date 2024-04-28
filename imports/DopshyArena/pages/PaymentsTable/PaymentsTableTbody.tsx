import React, { useState } from "react"
import { IPaymentsTable } from "./PaymentsTable";
import { Button } from "react-bootstrap";
import Swall from "sweetalert2";
import { PopupModal } from "../../components/PopupModal/PopupModal";
import { useGetStudentsOrParents } from "../../../helpers/hooks/useGetStudentsOrParents";

const PaymentsTableTbody: React.FC<IPaymentsTable> = ({ students, payments, parents }) => {
    const [paymentNumber, setPaymentNumber] = useState('');
    const [show, setShow] = useState(false);
    const [studentId, setStudentId] = useState('')

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        state: React.Dispatch<React.SetStateAction<string>>) => {

        state(e.target.value)
    }

    const openModal = (studentId: string) => {
        setStudentId(studentId)
        setShow(true)
    }

    const closeModal = () => {
        setShow(false);
        setPaymentNumber('')
    }

    const { data } = useGetStudentsOrParents('parent', studentId)

    const billSend = () => {

        const date = new Date();

        const contentMessage = `Вам выставлен счет на сумму ${paymentNumber}тг`

        const paymentData = {
            studentId,
            parentId: data.userId,
            date,
            paymentNumber,
            status: 'invoice'
        }

        const dataForDashboard = {
            paymentData
        }

        Meteor.call('payments.insert', studentId, data.userId, date, paymentNumber, 'invoice')
        Meteor.call('notifications.insert', studentId, data.userId, date, contentMessage, 'payment')
        Meteor.call('dashboard.insert', dataForDashboard, data.userId)
    }

    return (
        <tbody>
            <PopupModal
                show={show}
                onHide={closeModal}
                content={
                    <div>
                        <input type="number" value={paymentNumber} onChange={(e) => handleChange(e, setPaymentNumber)} />
                        <Button onClick={billSend}>Выстовить счет</Button>
                    </div>
                }
                title={'Выстовить счет'}
                closeButton={true}
            />
            {students.map(student => {
                const studentPayments = payments.filter(payment => payment.userId === student.userId && payment.status === 'paid');

                return <tr key={student.userId}>
                    <td>{student.name}</td>
                    <td>{student.parentFullName}</td>
                    <td>{student.parentPhone}</td>
                    <td>body</td>
                    {studentPayments.length > 0 ? (
                        <td>{studentPayments[studentPayments.length - 1].date.toLocaleDateString()}</td>
                    ) : (
                        <td></td>
                    )}
                    <td>
                        <Button onClick={() => openModal(student.userId)}>Выстовить счет</Button>
                    </td>
                </tr>
            })}
        </tbody>
    )
}

export default PaymentsTableTbody;