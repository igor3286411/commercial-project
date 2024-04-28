import React from 'react';
import { Link } from "react-router-dom";
import { useMultipleTrainers } from '../../../helpers/hooks/useMultipleTrainers';

const Attendance = () => {

    const { trainers } = useMultipleTrainers();

    return (
        <div>
            {trainers.map(item => (
                <Link key={item._id} to={`/attendance/${item.userId}`}>
                    <button>{item.name}{item.surname}</button>
                </Link>
            ))}
        </div>
    )
}

export default Attendance;