import React from "react";
import { Button } from '@gravity-ui/uikit';
import { Random } from "meteor/random";
import { useFields } from "../../../helpers/hooks/useFields";
import './ScheduleFields.scss'
import FieldCard from "./FieldCard";

const ScheduleFields = () => {
    const { fields } = useFields();
    console.log(fields)

    const addField = () => {

        const fieldId = Random.id()

        const schedule = [
            {
                days: '',
                times: ''
            }
        ]
        const fieldData = {
            fieldName: '',
            fieldId,
            info: '',
            schedule: schedule,
            active: true,
        }

        Meteor.call('fields.insert', fieldData)
    }

    return (
        <div>
            <h2>Расписание полей</h2>
            <Button onClick={addField} className="fields__add">Добавить поле</Button>
            <div className="wrapperFilds">
                {fields.map((field) => {
                    return (
                        <FieldCard field={field} key={field.fieldId} />
                    )
                })}
            </div>
        </div>
    )
}

export default ScheduleFields;
