import React, { useState } from 'react';
import './CreateSection.scss'
import { SectionSections } from './Section/SectionSections';
import { SectionGroups } from './Section/SectionGroups';
import { SectionDays } from './Section/SectionDays';
import { SectionFields } from './Section/SectionFields';
import { useSearchParams } from 'react-router-dom';
import { useSections } from '../../../../../helpers/hooks/useSections';
import { SectionContext } from './SectionContext';
import { useWindowSize } from 'usehooks-ts'
import { SectionTime } from './Section/SectionTime';
import { SectionMobileVersion } from './SectionMobileVersion/SectionMobileVersion';
import { useFields } from '../../../../../helpers/hooks/useFields';

const CreateSectionNew = () => {
    const { sections, isSectionsLoading } = useSections();
    const [searchParams, setSearchParams] = useSearchParams();
    const { width } = useWindowSize()
    const { fields } = useFields();
    const [clickRedactContext, setClickRedactContext] = useState<Array<{ id: string, isOpen: boolean }>>([])

    const sectionParams = searchParams.get('section') || ''
    const fieldParams = searchParams.get('fieldId') || ''
    const dayParams = searchParams.get('day') || ''
    const timeParams = searchParams.get('time') || ''
    const groupParams = searchParams.get('group') || ''

    const fieldParamsID = fields.filter(field => field.fieldName === fieldParams)

    if (!isSectionsLoading) {
        return (
            <SectionContext.Provider value={{ clickRedactContext, setClickRedactContext }}>
                <div className='add-sections'>
                    <h2>Управление секциями</h2>
                    {width <= 1250 && <SectionMobileVersion sections={sections} />}
                    {width > 1250 && <div className='add-sections__menu-section'>
                        {<SectionSections sections={sections} />}
                        {sectionParams && <SectionFields sections={sections} sectionParams={sectionParams} />}

                        {sectionParams && fieldParams && <SectionDays fieldParams={fieldParamsID[0].fieldId} />}
                        {sectionParams && fieldParams && dayParams && <SectionTime fieldParams={fieldParamsID[0].fieldId} dayParams={dayParams} />}
                        {sectionParams && fieldParams && dayParams && timeParams 
                        && <SectionGroups sections={sections} sectionParams={sectionParams} fieldParams={fieldParamsID[0].fieldId} />}
                    </div>}
                </div>
            </SectionContext.Provider>
        )
    }
}

export default CreateSectionNew;