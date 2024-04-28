import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import './Settings.scss'

const Settings = () => {
    return (
        <div className='settings'>
            <Link to='fields'>
                <Button>Настройка полей</Button>
            </Link>
            <Link to='trainers'>
                <Button>Настройка тренеров</Button>
            </Link>
            {/* <Link to='students'>
                <Button>Настройка учеников</Button>
            </Link> */}
            <Link to='parents'>
                <Button>Настройка родителей</Button>
            </Link>
            <Link to='sections'>
                <Button>Настройка групп</Button>
            </Link>
        </div>
    )
}

export default Settings