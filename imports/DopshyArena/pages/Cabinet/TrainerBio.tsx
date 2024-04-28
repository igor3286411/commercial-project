import './UserCabinet.scss'
import React from 'react'
import { usePhotos } from '../../../helpers/hooks/usePhotos';
import { Form } from 'react-bootstrap';
import { TextArea, Text } from '@gravity-ui/uikit';
import { PencilToLine } from '@gravity-ui/icons';

function TrainerBio() {

    const user = Meteor.user();
    const { photos } = usePhotos();
    const currentPhoto = photos.filter(photo => photo.userId === user?.profile?.userId)[0]
    const imageData = `${currentPhoto?.imageData}`
    const imageSrc = `data:image/png;base64,${imageData}`
    const username = user?.profile?.userType
    const imagePlaceholder = `https://placehold.co/200x200@3x?text=${username}.png`

    return (
        <div className='container'>
            <div className='profile__text'>О себе</div>
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
                    <Form>
                        <Text>Личная информация:</Text>
                        <div className='profileDataLine'>
                            <TextArea placeholder="дата рождения" size="s" view='clear' /><PencilToLine />
                        </div>
                        <Text>Достижения:</Text>
                        <div className='profileDataLine'>
                            <TextArea placeholder="образование" size="s" view='clear' /><PencilToLine />
                        </div>
                        <Text>Сертификаты:</Text>
                        <div className='profileDataLine'>
                            <TextArea placeholder="добавить сертификаты" size="s" view='clear' /><PencilToLine />
                        </div>
                    </Form>
                </div>
            </div>
        </div >

    )
}

export default TrainerBio