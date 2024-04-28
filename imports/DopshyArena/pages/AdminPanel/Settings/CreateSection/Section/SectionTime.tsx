import React, { FC } from 'react';
import { ButtonAndInput } from './ButtonAndInput';
import { SectionProps } from './SectionSections';
import { useDaysByFieldId } from '../../../../../../helpers/hooks/useDaysByFieldId';

export const SectionTime: FC<SectionProps> = ({ fieldParams, dayParams }) => {
    const { days } = useDaysByFieldId(fieldParams);
    const currentDay = days?.filter(day => day.days === dayParams)
    const timesArray = currentDay ? currentDay[0]?.times.split(', ') : null;

    return (
        <div className='add-sections__menu-section-groups'>
            <h3>Время</h3>
            {timesArray ? timesArray.map((time, index) => {
                return (
                    <ButtonAndInput
                        key={index}
                        id={fieldParams}
                        textButton={time}
                        typeButton="time"
                        index={index} />
                )
            }) : <h4>Время отсутствуют</h4>}
        </div>
    )
}