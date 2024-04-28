import './UserCabinet.scss'
import React, { FC } from 'react'
import { CabinetRouteButton } from './cabinetData.ts'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { usePhotos } from '../../../helpers/hooks/usePhotos.tsx'
import { useStudent } from '../../../helpers/hooks/useStudent';
import { usePayments } from '../../../helpers/hooks/usePayments.tsx'
import { useParams } from 'react-router-dom'
import { Loader } from '@gravity-ui/uikit';

interface UserCabinetProps {
    buttons: CabinetRouteButton[],
}

const UserCabinet: FC<UserCabinetProps> = ({ buttons }) => {
    const user = Meteor.user();
    const { id } = useParams();
    const { student } = useStudent(id);
    const { photos, isPhotosLoading } = usePhotos();
    //@ts-ignore
    const currentPhoto = photos.filter(photo => id ? photo.userId === id : photo.id === user?.profile?.userId)[0]
    //@ts-ignore
    const username = user?.profile?.userType
    const imagePlaceholder = `https://placehold.co/200x200@3x?text=${username}.png`

    const { payments } = usePayments(student?.userId);

    return (
        <div>
            <div className='profile__text'>Профиль</div>
            <div className='profile__container'>
                <div className='profile__left-side'>
                    {!isPhotosLoading ? (
                        <div className='profile__image'>
                            {
                                `${currentPhoto?.imageSrc}` == 'undefined' ?
                                    <img src={imagePlaceholder} />
                                    :
                                    <img src={currentPhoto?.imageSrc} />
                            }
                        </div>
                    ) : <div style={{ padding: '100px' }}><Loader size="l" /></div>}
                    <div className='profile__text'>
                        {
                            student ? student.name + ' ' + student.surname : username !== 'student' ?
                                (username) :
                                (student?.name + ' ' + student?.surname)
                        }
                    </div>
                </div>
                <div className='profile__right-side'>
                    {
                        buttons.map(button => !button.route
                            ? (
                                <Button disabled className='profile__button'>{button.text}</Button>
                            )
                            : (
                                <Link to={button.route}>
                                    <Button className='profile__button'>{button.text}</Button>
                                </Link>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default UserCabinet