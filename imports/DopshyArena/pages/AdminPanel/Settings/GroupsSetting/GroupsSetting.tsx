import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const GroupsSetting = () => {
    return (
        <div className='container'>
            <Link to='/trainers'><Button>Лист тренеров</Button></Link>
            <Link to='/students'><Button>Лист учеников</Button></Link>
        </div>
    )
}

export default GroupsSetting;