import React, { useEffect, useState } from 'react';
import { CabinetRoute, getCabinetRoutesById } from './cabinetData.ts';
import UserCabinet from './UserCabinet.tsx';

interface ICabinet {
    checkUserType: string
}

const Cabinet: React.FC<ICabinet> = ({ checkUserType }) => {
    const [currentCabinet, setCurrentCabinet] = useState<CabinetRoute | null>(null)

    //@ts-ignore
    const userId = Meteor.user()?.profile.userId;

    useEffect(() => {
        for (const cabinet of getCabinetRoutesById(userId)) {
            if (cabinet.userType === checkUserType) {
                setCurrentCabinet(cabinet)

            }
        }
    }, [checkUserType])

    return (
        <div className='container'>
            {currentCabinet ? <UserCabinet buttons={currentCabinet.buttons} /> : <div>Загрузка...</div>}
        </div>
    )
}

export default Cabinet;
