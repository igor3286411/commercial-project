import React, { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import AvatarUpload from "../../../../components/AvatarUpload/AvatarUpload";
import { Form, Button } from "react-bootstrap";
import { Random } from "meteor/random";
import CreateStudents from "../CreateStudents/CreateStudents";
import { useParams } from "react-router-dom";
import { useParent } from "../../../../../helpers/hooks/useParent";

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const CreateParents = () => {
    const [parentName, setParentName] = useState<string | undefined>('');
    const [parentSurname, setParentSurname] = useState<string | undefined>('');
    const [iin, setIin] = useState<string | undefined>('')
    const [photo, setPhoto] = useState<string | undefined>('')
    const [parentEmail, setParentEmail] = useState<string | undefined>('')
    const [parentPhone, setParentPhone] = useState<string | undefined>('')
    const [parentReady, setParentReady] = useState<boolean>(false)



    const { id } = useParams();
    const { parent } = useParent(id)

    const handleChange = (event: React.ChangeEvent<FormControlElement>,
        state: React.Dispatch<React.SetStateAction<string | undefined>>) => {
        state(event.target.value);
    }

    const parentId = Random.id();

    const parentData = {
        userId: parentId,
        iin,
        name: parentName,
        surname: parentSurname,
        phone: parentPhone,
        email: parentEmail
    }



    const createParent = () => {
        if (parentName !== '' && parentSurname !== '' && iin !== '') {
            setParentReady(true)
        }
    }

    const renderCreate = () => {
        if (!id) {
            return <div>
                <Form.Label htmlFor="parentPhoto">Фото:</Form.Label>
                <AvatarUpload photo={photo} setPhoto={setPhoto} />

                <Form.Label htmlFor="parentIin">Иин родителя:</Form.Label>
                <Form.Control type="text" value={iin} onChange={(e) => handleChange(e, setIin)} />

                <Form.Label htmlFor="parentName">Имя родителя:</Form.Label>
                <Form.Control type="text" value={parentName} onChange={(e) => handleChange(e, setParentName)} />

                <Form.Label htmlFor="parentName">Фамилия родителя:</Form.Label>
                <Form.Control type="text" value={parentSurname} onChange={(e) => handleChange(e, setParentSurname)} />

                <Form.Label htmlFor="parentName">Почта родителя:</Form.Label>
                <Form.Control type="text" value={parentEmail} onChange={(e) => handleChange(e, setParentEmail)} />

                <Form.Label htmlFor="parentName">Номер родителя:</Form.Label>
                <Form.Control type="text" value={parentPhone} onChange={(e) => handleChange(e, setParentPhone)} />
            </div>
        } else {
            return <div></div>
        }
    }

    return (
        <div>
            {renderCreate()}
            {parentReady || id ? <CreateStudents parentData={parent ? parent : parentData} id={id} /> : <Button onClick={createParent}>Создать родителя</Button>}

            {/* <div>
            <img src={`data:image/png;base64,${photo?.data}`} alt="" />
            </div> */}
        </div>
    )
}

export default CreateParents;