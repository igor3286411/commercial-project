import React, { FC, useState } from 'react';
import { SectionProps } from './SectionSections';
import { Button, TextInput } from '@gravity-ui/uikit';
import { ButtonAndInput } from './ButtonAndInput';
import { useGroupsTimeForGroup } from '../../../../../../helpers/hooks/useGroupsTimeForGroup';
import { useGroupsForSection } from '../../../../../../helpers/hooks/useGroupForSection';

export const SectionSubGroups: FC<SectionProps> = ({ sections, sectionParams, groupParams }) => {
    const [subGroupName, setSubGroupName] = useState<string>()
    const [onBlur, setOnBlur] = useState<boolean>(false)
    const sectionGroups = sections && sections.find(section => section.sectionName === sectionParams)

    const { groups } = useGroupsForSection(sectionGroups?.sectionId)

    const group = groups.find(group => group.groupName === groupParams)

    const { groupsTime } = useGroupsTimeForGroup(group?.sectionId, group?.groupId)

    const controlOnBlur = () => {
        setOnBlur(false);
    };

    const handleChange = (e: any) => {
        setSubGroupName(e.target.value);
    };

    const inputSubmit = (e: any) => {
        e.preventDefault()
        setOnBlur(false);
        if (subGroupName) {
            Meteor.call('groupsTime.insert', group?.sectionId, group?.groupId, subGroupName)
        }
        setSubGroupName("")
    }

    return (
        <div className='add-sections__menu-section-sub-groups'>
            <h3>Подгруппы</h3>
            <Button view="outlined" size="l" onClick={() => setOnBlur(true)}>+ Добавить подгруппу</Button>
            {onBlur ?
                <form onSubmit={inputSubmit}>
                    <TextInput placeholder="Название подгруппы" onBlur={() => controlOnBlur()} size="l" value={subGroupName} onChange={handleChange} />
                </form> : ""}
            {groupsTime ? groupsTime.map((groupTime, index) => (
                <ButtonAndInput key={groupTime.groupTimeId}
                    textButton={groupTime.groupTimeName}
                    typeButton="groupTime"
                    index={index} />
            )) : <h4>Подгруппы отсутствуют</h4>}
        </div>
    )
}