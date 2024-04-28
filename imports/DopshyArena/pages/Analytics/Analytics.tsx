import React from 'react';
import Table from 'react-bootstrap/Table';
import { useMultipleStudents } from '../../../helpers/hooks/useMultipleStudents';
import { Link } from "react-router-dom";

const Analytics = () => {
    const { students } = useMultipleStudents();
    const studentsRender = () => {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Родители email</th>
                        <th>Посещаемость</th>
                        <th>Платеж</th>
                        <th>Пробный урок</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <Link to={`students/${student.userId}`}>{student.name} {student.surname}</Link>
                                </td>
                                <td>{student.email}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{student.trialLesson ? student.trialLesson : "нет"}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
        )
    };

    return (
        <div className='container'>
            {studentsRender()}
        </div>
    )
}

export default Analytics;