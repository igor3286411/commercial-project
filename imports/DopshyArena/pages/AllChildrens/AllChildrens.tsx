import React from 'react';
import { useGetStudentsOrParents } from '../../../helpers/hooks/useGetStudentsOrParents';
import { useMultipleStudents } from '../../../helpers/hooks/useMultipleStudents';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AllChildrens = () => {

    //@ts-ignore
    const userId = Meteor.user()?.profile?.userId
    const { data } = useGetStudentsOrParents('student', userId);
    const { students } = useMultipleStudents()
    const navigation = useNavigate();

    const clickStudent = (studentId: string) => {
        navigation(studentId)
    }

    const studentsRender = () => {
        //@ts-ignore
        return data.map(student => {
            return (
                <Card onClick={() => clickStudent(student.userId)} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>{`${student?.name} ${student?.surname}`}</Card.Title>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card>
            );
        });
    };

    return (
        <div className='container'>
            {studentsRender()}
        </div>
    )
}

export default AllChildrens;