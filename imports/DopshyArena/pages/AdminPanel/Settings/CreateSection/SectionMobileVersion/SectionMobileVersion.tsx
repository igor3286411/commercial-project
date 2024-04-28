import React, { FC } from "react"
import { Breadcrumbs } from '@gravity-ui/uikit';
import { SectionProps, SectionSections } from "../Section/SectionSections";
import { useSearchParams } from "react-router-dom";
import { SectionGroups } from "../Section/SectionGroups";
import { SectionFields } from "../Section/SectionFields";
import { SectionDays } from "../Section/SectionDays";
import { SectionTime } from "../Section/SectionTime";
import { useFields } from "../../../../../../helpers/hooks/useFields";

export const SectionMobileVersion: FC<SectionProps> = ({ sections }) => {
    const { fields } = useFields();
    const [searchParams, setSearchParams] = useSearchParams();
    const sectionParams = searchParams.get('section') || ''
    const fieldParams = searchParams.get('fieldId') || ''
    const dayParams = searchParams.get('day') || ''
    const timeParams = searchParams.get('time') || ''
    const groupParams = searchParams.get('group') || ''

    const fieldParamsID = fields.filter(field => field.fieldName === fieldParams)

    return (
        <div className='add-sections__menu-mobile'>
            <Breadcrumbs
                items={[
                    {
                        text: "Секции",
                        action: () => { setSearchParams({}) },
                    },
                    {
                        text: sectionParams,
                        action: () => { setSearchParams({ section: sectionParams }) },
                    },
                    {
                        text: fieldParams,
                        action: () => { setSearchParams({ section: sectionParams, fieldId: fieldParams }) },
                    },
                    {
                        text: dayParams,
                        action: () => { setSearchParams({ section: sectionParams, fieldId: fieldParams, day: dayParams }) },
                    },
                    {
                        text: timeParams,
                        action: () => { setSearchParams({ section: sectionParams, fieldId: fieldParams, day: dayParams, time: timeParams }) },
                    },
                    {
                        text: groupParams,
                        action: () => { },
                    },
                ].filter(item => (item.text))}
                firstDisplayedItemsCount={1}
                lastDisplayedItemsCount={1}
            />
            {!sectionParams && <SectionSections sections={sections} />}
            {sectionParams && !fieldParams && <SectionFields sections={sections} sectionParams={sectionParams} />}
            {sectionParams && fieldParams && !dayParams && <SectionDays fieldParams={fieldParamsID[0].fieldId} />}
            {sectionParams && fieldParams && dayParams && !timeParams && <SectionTime fieldParams={fieldParamsID[0].fieldId} dayParams={dayParams} />}
            {sectionParams && fieldParams && dayParams && timeParams
                && <SectionGroups sections={sections} sectionParams={sectionParams} fieldParams={fieldParamsID[0].fieldId} />}
        </div>
    )
}