import React, { FC, useId, useState } from "react";
//@ts-ignore
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { format } from "date-fns";
import AvatarUpload from "../../../../components/AvatarUpload/AvatarUpload";
import handleUpload from "../../../../../helpers/hocs/handleUpload";
import { Form, Button } from "react-bootstrap";
import { Random } from "meteor/random";
import { Parent } from "../../../../../helpers/types";

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

interface ICreateStudents {
    parentData: Parent | object,
    id: string
}

const CreateStudents: FC<ICreateStudents> = ({ parentData, id }) => {
    const [studentName, setStudentName] = useState<string>();
    const [studentSurname, setStudentSurname] = useState<string>();
    const [studentAge, setStudentAge] = useState<string>();
    const [photo, setPhoto] = useState<string>('')
    const [studentEmail, setStudentEmail] = useState<string>()
    const [studentPhone, setStudentPhone] = useState<string>()
    const [isTrialLesson, setIsTrialLesson] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleChange = (event: React.ChangeEvent<FormControlElement>,
        state: React.Dispatch<React.SetStateAction<string | undefined>>) => {
        state(event.target.value);
    }

    const handleChangeTrialLesson = () => {
        setIsTrialLesson(!isTrialLesson);
    }

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };
    const formattedDate = isTrialLesson ? format(selectedDate, "dd.MM.yyyy") : "";

    const createStudent = () => {
        const studentId = Random.id();

        const studentData = {
            userId: studentId,
            name: studentName,
            surname: studentSurname,
            age: studentAge,
            phone: studentPhone,
            email: studentEmail,
            trialLesson: formattedDate,
        }

        const objectForDashboard = {
            parentData,
            studentData
        }


        if (studentName !== '' && studentSurname !== '' && studentAge !== '') {
            Meteor.call('students.insert', studentData, parentData)

            Meteor.call('dashboard.insert', objectForDashboard)

            if (id) {
                Meteor.call('parents.addChild', id, studentId)
            } else {
                Meteor.call('parents.insert', parentData, studentData)
            }

            handleUpload(photo, studentId, 'student')
            //@ts-ignore
            handleUpload(photo, parentData.userId, 'parent')
        } else {
            return
        }
    }

    return (
        <div>
            <Form.Label htmlFor="studentPhoto">Фото:</Form.Label>
            <AvatarUpload photo={photo} setPhoto={setPhoto} />

            <Form.Label htmlFor="studentName">Имя ученика:</Form.Label>
            <Form.Control type="text" value={studentName} onChange={(e) => handleChange(e, setStudentName)} />

            <Form.Label htmlFor="studentName">Фамилия ученика:</Form.Label>
            <Form.Control type="text" value={studentSurname} onChange={(e) => handleChange(e, setStudentSurname)} />

            {/* <Form.Label htmlFor="studentName">Почта ученика/родителя:</Form.Label>
            <Form.Control type="text" value={studentEmail} onChange={(e) => handleChange(e, setStudentEmail)} />

            <Form.Label htmlFor="studentName">Номер ученика/родителя:</Form.Label>
            <Form.Control type="text" value={studentPhone} onChange={(e) => handleChange(e, setStudentPhone)} /> */}

            <Form.Label htmlFor="studentName">Возраст ученика:</Form.Label>
            <Form.Control type="text" value={studentAge} onChange={(e) => handleChange(e, setStudentAge)} />

            <Form.Label htmlFor="studentName">Пробный урок:</Form.Label>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", maxWidth: "300px", width: "100%" }}>
                <DatePicker className="form-control" showIcon selected={selectedDate} onChange={handleDateChange} dateFormat="dd.MM.yyyy" minDate={selectedDate} disabled={!isTrialLesson} />
                <Form.Check type="checkbox" onChange={handleChangeTrialLesson} />
            </div>
            <Button onClick={createStudent}>Создать ученика</Button>

            {/* <div>
            <img src={`data:image/png;base64,${photo?.data}`} alt="" />
            </div> */}
        </div>
    )
}

export default CreateStudents;