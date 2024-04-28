import React, { FC } from 'react';
import { ButtonAndInput } from './ButtonAndInput';
import { SectionProps } from './SectionSections';
import { useFields } from '../../../../../../helpers/hooks/useFields';

export const SectionFields: FC<SectionProps> = ({ sections, sectionParams }) => {
    const { fields } = useFields();
    return (
        <div className='add-sections__menu-section-groups'>
            <h3>Поле</h3>
            {fields ? fields.map((field, index) => (
                <ButtonAndInput
                    key={index}
                    id={field.fieldId}
                    textButton={field.fieldName}
                    typeButton="field"
                    index={index} />
            )) : <h4>Поля отсутствуют</h4>}
        </div>
    )
}