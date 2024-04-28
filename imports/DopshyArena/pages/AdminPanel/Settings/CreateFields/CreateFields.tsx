import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const CreateFields = () => {
    const [fieldName, setFieldName] = useState('')
    const [fieldInfo, setFieldInfo] = useState('')

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldName(event.target.value);
    }

    const handleChangeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldInfo(event.target.value);
    }

    const createField = () => {
        const fieldData = {
            fieldName,
            fieldInfo
        }
        if (fieldName !== '' && fieldInfo !== '') {
            Meteor.call('fields.insert', fieldData)
        } else {
            return
        }
    }

    return (
        <div>
            <Form.Label htmlFor="fieldName">Название поля:</Form.Label>
            <Form.Control type="text" value={fieldName} onChange={handleChangeName} />

            <Form.Label htmlFor="fieldName">Описание поля:</Form.Label>
            <Form.Control type="text" value={fieldInfo} onChange={handleChangeInfo} />

            <Button onClick={createField}>Создать поле</Button>
        </div>
    )
}

export default CreateFields;