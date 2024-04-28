import React, { FC, useState } from 'react';
import { ButtonAndInput } from './ButtonAndInput';
import { Button, TextInput } from '@gravity-ui/uikit';
import { Section } from '../../../../../../helpers/types';

export interface SectionProps {
    sections?: Section[];
    sectionParams?: string;
    groupParams?: string;
    fieldParams?: string;
    dayParams?: string;
}

export const SectionSections: FC<SectionProps> = ({ sections }) => {

    const [sectionName, setSectionName] = useState<string>()
    const [onBlur, setOnBlur] = useState<boolean>(false)

    const controlOnBlur = () => {
        setOnBlur(false);
    };

    const handleChange = (e: any) => {
        setSectionName(e.target.value);
    };

    const inputSubmit = (e: any) => {
        e.preventDefault()
        setOnBlur(false);
        if (sectionName) {
            Meteor.call('sections.insert', sectionName)
        } else {
            return
        }
        setSectionName("")
    }

    return (
        <div className='add-sections__menu-section-section'>
            <h3>Секции</h3>
            <Button view="outlined" size="l" onClick={() => setOnBlur(true)}>+ Добавить секцию</Button>
            {onBlur ?
                <form onSubmit={inputSubmit}>
                    <TextInput placeholder="Название секции" onBlur={() => controlOnBlur()} size="l" value={sectionName} onChange={handleChange} />
                </form> : ""}
            {sections && sections.length ? sections.map((section, index) => (
                <ButtonAndInput key={section._id} textButton={section.sectionName} typeButton="section" index={index} />
            )) : <h4>Секции отсутствуют</h4>}
        </div>
    )
}