import React, { FC, useState } from 'react';
import { ButtonAndInput } from './ButtonAndInput';
import { Button, TextInput } from '@gravity-ui/uikit';
import { SectionProps } from './SectionSections';
import { useGroupsForSection } from '../../../../../../helpers/hooks/useGroupForSection';

export const SectionGroups: FC<SectionProps> = ({ sections, sectionParams, fieldParams }) => {
    const [groupName, setGroupName] = useState<string>()
    const [onBlur, setOnBlur] = useState<boolean>(false)

    const sectionGroups = sections && sections.find(section => section.sectionName === sectionParams)

    const { groups } = useGroupsForSection(sectionGroups?.sectionId)
    

    const controlOnBlur = () => {
        setOnBlur(false);
    };

    const handleChange = (e: any) => {
        setGroupName(e.target.value);
    };

    const inputSubmit = (e: any) => {
        e.preventDefault()
        setOnBlur(false);
        if (groupName && sectionGroups) {
            Meteor.call('groups.insert', sectionGroups.sectionId, groupName)
        }
        setGroupName("")
    }

    return (
        <div className='add-sections__menu-section-groups'>
            <h3>Группы</h3>
            <Button view="outlined" size="l" onClick={() => setOnBlur(true)}>+ Добавить группу</Button>
            {onBlur ?
                <form onSubmit={inputSubmit}>
                    <TextInput placeholder="Название группы" onBlur={() => controlOnBlur()} size="l" value={groupName} onChange={handleChange} />
                </form> : ""}
            {groups ? groups.map((group, index) => (
                <ButtonAndInput key={group.groupId}
                    textButton={group.groupName}
                    typeButton="group"
                    index={index} />
            )) : <h4>Группы отсутствуют</h4>}
        </div>
    )
}