import React from "react";
import PaymentsTableThead from "./PaymentsTableThead";
import PaymentsTableTbody from "./PaymentsTableTbody";
import { useMultipleStudents } from "../../../helpers/hooks/useMultipleStudents";
import { Payment, Student, Parent } from "../../../helpers/types";
import { usePayments } from "../../../helpers/hooks/usePayments";
import { useMultipleParents } from "../../../helpers/hooks/useMultipleParents";

export interface IPaymentsTable {
    students: Student[];
    payments: Payment[];
    parents: Parent[];
}

const PaymentsTable = () => {
    const { students } = useMultipleStudents();
    const { payments } = usePayments();
    const { parents } = useMultipleParents();

    return (
        <div>
            <h2>Платежи</h2>
            <table className="table table-bordered border-primary">
                <PaymentsTableThead />
                <PaymentsTableTbody students={students} payments={payments} parents={parents} />
            </table>
        </div>
    )
}

export default PaymentsTable;