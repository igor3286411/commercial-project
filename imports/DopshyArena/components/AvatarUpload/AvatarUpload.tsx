import React, { useState } from 'react';

interface IAvatarUpdload {
    photo: string;
    setPhoto: (photo: string) => void;
}

const AvatarUpload: React.FC<IAvatarUpdload> = ({ photo, setPhoto }) => {

    const handleFileChange = (event: any) => {
        const uploadedFile = event.target.files[0];
        setPhoto(uploadedFile);
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
                id="avatarInput"
            />
            <label htmlFor="avatarInput">Выбрать фото</label>
        </div>
    );
};

export default AvatarUpload;
