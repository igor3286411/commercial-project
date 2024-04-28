import React, { FC } from 'react';
import { ButtonAndInput } from './ButtonAndInput';
import { SectionProps } from './SectionSections';
import { useDaysByFieldId } from '../../../../../../helpers/hooks/useDaysByFieldId';

export const SectionDays: FC<SectionProps> = ({ fieldParams }) => {
    const { days } = useDaysByFieldId(fieldParams);  

    return (
        <div className='add-sections__menu-section-groups'>
            <h3>Дни</h3>
            {days ? days.map((day, index) => (
                day.days && <ButtonAndInput id={fieldParams}
                    key={index}
                    textButton={day.days}
                    typeButton="day"
                    index={index} />
            )) : <h4>Дни отсутствуют</h4>}
        </div>
    )
}