import React from 'react';
import NotificationsComponent from '../Notifications/NotificationsComponent';
import { Button, Link } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';
import './Navigation.scss';

interface INavigation {
    checkUserType: string
}

const Navigation: React.FC<INavigation> = ({ checkUserType }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        Meteor.logout();
        navigate('/login');
    }

    const changeNavLink = () => {
        return (
            checkUserType ? (
                <div className='navigation-buttons'>
                    <Link href="/cabinet">Кабинет</Link>
                    <Button onClick={handleLogout} >Выйти</Button>
                </div>
            ) : (
                <div className='navigation-buttons'>
                    <Link href="/login">
                        <Button view="outlined-info" selected size="l">Войти</Button>
                    </Link>
                </div>
            )
        );
    }

    return (
        <div className='header'>
            <div className="header__nav">
                <Link className='header__nav-link' href={'/fields'}>
                    Площадки
                </Link>
                <Link href="" className='header__nav-link'>Секции</Link>
                <Link href="/schedule" className='header__nav-link'>Расписание</Link>
                <Link href="" className='header__nav-link'>События</Link>
                <Link href="" style={{ display: 'flex' }}>
                    {changeNavLink()}
                </Link>

                {checkUserType ? <NotificationsComponent /> : undefined}
            </div>
        </div>
    )
}

export default Navigation;