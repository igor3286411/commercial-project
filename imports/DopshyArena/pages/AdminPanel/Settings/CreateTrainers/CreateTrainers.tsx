import React, { useState } from "react"
import AvatarUpload from "../../../../components/AvatarUpload/AvatarUpload"
import { Button, Form } from "react-bootstrap"
import { Random } from "meteor/random"
import handleUpload from "../../../../../helpers/hocs/handleUpload"

const CreateTrainers = () => {
    const [trainerName, setTrainerName] = useState<string>()
    const [trainerSurname, setTrainerSurname] = useState<string>()
    const [trainerAge, setTrainerAge] = useState<string>()
    const [photo, setPhoto] = useState<string>('')
    const [trainerEmail, setTrainerEmail] = useState<string>()
    const [trainerPhone, setTrainerPhone] = useState<string>()
    const [trainerPrice, setTrainerPrice] = useState<number>()


    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        state: any
    ) => {
        state(event.target.value);
    };

    const createTrainer = () => {
        const trainerId = Random.id();

        const trainerData = {
            userId: trainerId,
            name: trainerName,
            surname: trainerSurname,
            age: trainerAge,
            phone: trainerPhone,
            email: trainerEmail,
            price: trainerPrice,
            sections: [{
                sectionName: null, groupName: null, subGroupName: null
            }]
        }
        if (trainerName !== '' && trainerSurname !== '' && trainerAge !== '') {
            Meteor.call('trainers.insert', trainerData)

            if (photo) {
                handleUpload(photo, trainerId, 'trainer')
            }
        } else {
            return
        }
    }

    return (
        <div>
            <div>
                <label htmlFor="trainerPhoto">Фото:</label>
                <AvatarUpload photo={photo} setPhoto={setPhoto} />
                <Form.Label htmlFor="trainerName">Имя тренера:</Form.Label>
                <Form.Control type="text" value={trainerName} onChange={(event) => handleChange(event, setTrainerName)} />

                <Form.Label htmlFor="trainerSurname">Фамилия тренера:</Form.Label>
                <Form.Control type="text" value={trainerSurname} onChange={(event) => handleChange(event, setTrainerSurname)} />

                <Form.Label htmlFor="trainerEmail">Почта тренера:</Form.Label>
                <Form.Control type="text" value={trainerEmail} onChange={(event) => handleChange(event, setTrainerEmail)} />

                <Form.Label htmlFor="trainerPhone">Номер тренера:</Form.Label>
                <Form.Control type="text" value={trainerPhone} onChange={(event) => handleChange(event, setTrainerPhone)} />

                <Form.Label htmlFor="trainerAge">Возраст тренера:</Form.Label>
                <Form.Control type="text" value={trainerAge} onChange={(event) => handleChange(event, setTrainerAge)} />

                <Form.Label htmlFor="trainerAge">Цена за урок:</Form.Label>
                <Form.Control type="text" value={trainerPrice} onChange={(event) => handleChange(event, setTrainerPrice)} />
                {/* 
                <label htmlFor="studentName">Класс ученика:</label>
                <input type="text" value={trainerClass} onChange={handleChangeClass} /> */}
            </div>
            <Button onClick={createTrainer}>Создать тренера</Button>
        </div>
    )
}

export default CreateTrainers;