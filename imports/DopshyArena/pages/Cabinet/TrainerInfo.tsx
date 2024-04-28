import './UserCabinet.scss'
import React from 'react'
import { usePhotos } from '../../../helpers/hooks/usePhotos';
import { useParams } from 'react-router-dom';
import { TextInput, Button } from '@gravity-ui/uikit';
import { useTrainer } from '../../../helpers/hooks/useTrainer';

function TrainerInfo() {

    const user = Meteor.user();
    const { trainer } = useTrainer(user?._id)
    const { photos } = usePhotos();
    const currentPhoto = photos.filter(photo => photo.userId === user?.profile?.userId)[0]
    const imageData = `${currentPhoto?.imageData}`
    const imageSrc = `data:image/png;base64,${imageData}`
    const username = user?.profile?.userType
    const imagePlaceholder = `https://placehold.co/200x200@3x?text=${username}.png`

    return (
        <div className='container'>
            <div className='profile__text'>Данные</div>
            <div className='profile__container'>
                <div className='profile__left-side'>
                    <div className='profile__image'>
                        {
                            `${imageData}` == 'undefined' ?
                                <img src={imagePlaceholder} />
                                :
                                <img src={imageSrc} />
                        }
                    </div>
                    <div className='profile__text'>
                        {username}
                    </div>
                </div>
                <div className='profile__right-side'>
                    <TextInput label="Почта:" type="email" value={trainer?.email} />
                    <TextInput label="Пароль:" type="password" />
                    <TextInput label="Сертификаты:" />
                    <Button size="l" view="outlined" type='submit'>Сохранить</Button>
                </div>
            </div>
        </div>

    )
}

export default TrainerInfo