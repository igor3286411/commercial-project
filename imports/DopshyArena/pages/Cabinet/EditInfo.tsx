import './UserCabinet.scss'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { usePhotos } from '../../../helpers/hooks/usePhotos';
import { TextInput, Button, Loader } from '@gravity-ui/uikit';
import { PencilToLine } from '@gravity-ui/icons';
import { useUser } from '../../../helpers/hooks/useUser';
import AvatarUpload from '../../components/AvatarUpload/AvatarUpload';
import handleUpload from '../../../helpers/hocs/handleUpload';
import { useMultipleParents } from '../../../helpers/hooks/useMultipleParents';

function EditInfo() {
    const currentUser = Meteor.user();
    //@ts-ignore
    const currentUserId = currentUser?._id
    const { id } = useParams();
    const { photos, isPhotosLoading } = usePhotos();
    const [photo, setPhoto] = useState('')
    //@ts-ignore
    const userType = Meteor.user()?.profile.userType;
    const { user, isUserLoading } = useUser(id)
    const fullName = user?.name + ' ' + user?.surname
    const currentPhoto = photos.filter(photo => photo.id === id)[0]
    const username = user?.profile?.userType
    const imagePlaceholder = `https://placehold.co/200x200@3x?text=${username}.png`

    const { parents } = useMultipleParents();

    const [data, setData] = useState({})

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setData({
            ...data,
            [key]: e.target.value
        })
    }

    const saveInfo = () => {
        Meteor.call(`${userType === 'parent' && id !== currentUserId ?
            'student' : userType
            }.edit`, user?.userId, data)

    }

    if (photo) {
        handleUpload(photo, user?.userId, user?.userType)
    }

    return (
        <div>
            {!isUserLoading ? <div className='container'>
                <div className='profile__text'>Данные</div>
                <div className='profile__container'>
                    <div className='profile__left-side'>
                        {!isPhotosLoading ? (

                            <div className='profile__image'>
                                <div>
                                    <AvatarUpload photo={photo} setPhoto={setPhoto} />
                                </div>
                                {
                                    `${currentPhoto?.imageSrc}` == 'undefined' ?
                                        <img src={imagePlaceholder} />
                                        :
                                        <img src={currentPhoto?.imageSrc} />
                                }
                            </div>
                        ) : <div style={{ padding: '100px' }}><Loader size="l" /></div>}
                        <div className='profile__text'>
                            {fullName}
                        </div>
                    </div>
                    <div className='profile__right-side'>
                        <div className='profileDataLine'>
                            <TextInput label="Имя:" view='clear' onChange={(e) => changeInput(e, 'name')} defaultValue={user?.name} /><PencilToLine />
                        </div>
                        <div className='profileDataLine'>
                            <TextInput label="Фамилия:" view='clear' onChange={(e) => changeInput(e, 'surname')} defaultValue={user?.surname} /><PencilToLine />
                        </div>
                        <div className='profileDataLine'>
                            <TextInput label="ИИН:" view='clear' onChange={(e) => changeInput(e, 'iin')} defaultValue={user?.iin} /><PencilToLine />
                        </div>
                        <div className='profileDataLine'>
                            <TextInput size='l' label="Номер телефона:" view='clear' onChange={(e) => changeInput(e, 'phone')} defaultValue={user?.phone} /><PencilToLine />
                        </div>
                        {/* <div className='profileDataLine'>
                            <Switch content="Перевести на платный" defaultChecked size="m" />
                        </div> */}
                        <Button onClick={saveInfo} size="l" view="outlined" type='submit'>Сохранить</Button>
                    </div>
                </div>
            </div> : <div>Загрузка...</div>}
        </div>

    )
}

export default EditInfo