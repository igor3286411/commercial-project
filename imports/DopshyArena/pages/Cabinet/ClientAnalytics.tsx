import React from 'react'
import { Table } from '@gravity-ui/uikit'
import { useMultipleStudents } from '../../../helpers/hooks/useMultipleStudents'
import { Spin } from '@gravity-ui/uikit'

const ClientAnalytics = () => {

    const { students, isStudentsLoading } = useMultipleStudents();

    const fullNameStudents = students.map(student => `${student.name} ${student.surname}`)
    const fullNameParents = students.map(student => student.parentFullName ? student.parentFullName : '')
    const phoneParents = students.map(student => student.parentPhone ? student.parentPhone : '')

    const headers = ['ФИО (ребенок)', 'Родители', 'Контакты', 'Посещаемость', '*Последний платеж дата']

    const columns = [];
    for (let i = 0; i < headers.length; i++) {
        const object = { id: headers[i] }; columns.push(object);
    }

    const ndata = [];

    for (let i = 0; i < fullNameStudents.length; i++) {
        const obj = {
            [headers[0]]: fullNameStudents[i],
            [headers[1]]: fullNameParents[i],
            [headers[2]]: phoneParents[i]
        };
        ndata.push(obj);
    }

    return (
        <>
            {
                !isStudentsLoading ? <div className='container'>
                    <h3>Клиенты</h3>
                    <Table data={ndata}
                        columns={columns}
                    />
                </div> : <div className='container'><Spin size='xl' /></div>
            }
        </>
    )
}

export default ClientAnalytics