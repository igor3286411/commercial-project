import React from 'react';
import { useMultipleParents } from '../../../helpers/hooks/useMultipleParents';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AllParents = () => {

    //@ts-ignore
    const userId = Meteor.user()?.profile?.userId
    const { parents } = useMultipleParents();
    const navigation = useNavigate();

    const clickStudent = (parentId: string) => {
        navigation(parentId)
    }


    const parentsRender = () => {
        return parents.map(parent => {
            return (
                <Card onClick={() => clickStudent(parent.userId)} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>{`${parent?.name} ${parent?.surname}`}</Card.Title>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card>
            );
        });
    };

    return (
        <div className='container'>
            {parentsRender()}
        </div>
    )
}

export default AllParents;