import React from 'react';
import { useFields } from '../../../helpers/hooks/useFields';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Fields.scss';

const Fields = () => {

    const { fields } = useFields();

    return (
        <div className='fields__wrapper'>
            {fields.map(item => (
                <Link key={item.fieldName} to={`/fields/${item._id}`}>
                    <Button>{item.fieldName}</Button>
                </Link>
            ))}
        </div>
    )
}

export default Fields;