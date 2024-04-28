import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, Form } from 'react-bootstrap';

import { useFields } from '../../../../../helpers/hooks/useFields';
import formatDateString from '../../../../../helpers/hocs/formatDateString';
import Discount from '../../../../components/Discount/Discount';
import allDaysMonth from '../../../../../helpers/hocs/allDaysMonth';
import CreateFields from '../CreateFields/CreateFields';


const FieldsSettings = () => {
    const [dates, setDates] = useState<Date[]>([]);
    const [time, setTime] = useState<Array<number>>([]);
    const [selectedTime, setSelectedTime] = useState<number>()
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [beforeSelectedTime, setBeforeSelectedTime] = useState<number>();
    const [beforeSelectedDate, setBeforeSelectedDate] = useState<Date>();
    const [selectField, setSelectField] = useState<string>()
    const beforeDate = selectedDate ? dates.filter(item => selectedDate <= item) : [];
    const { fields } = useFields();

    useEffect(() => {
        allDaysMonth(setDates, setTime);
    }, [])

    const handleChangeDate = (
        event: React.ChangeEvent<HTMLSelectElement>,
        state: React.Dispatch<React.SetStateAction<Date | undefined>>
    ) => {
        const selectedDateAsString = event.target.value;
        const selectedDateAsDate = new Date(selectedDateAsString);
        selectedDateAsDate.setHours(0, 0, 0, 0);
        state(selectedDateAsDate);
    };

    const handleChange = <T extends string | number>(
        event: React.ChangeEvent<HTMLSelectElement>,
        state: React.Dispatch<React.SetStateAction<T | undefined>>
    ) => {
        const selectedDateAsString = event.target.value as T;
        state(selectedDateAsString);
    };

    let resultPrice: number;

    const handleCalculationResult = (result: number) => {
        resultPrice = result
    };

    const settingsForFields = () => {
        if (selectField) {
            return <div>
                <div className="settings__control">
                    <Form.Label htmlFor="withDropdown">Выберите дату:</Form.Label>
                    <Form.Select
                        id="withDropdown"
                        value={selectedDate ? formatDateString(selectedDate) : ''}
                        onChange={(event) => handleChangeDate(event, setSelectedDate)}>
                        <option value="">Выберите</option>
                        {dates.map((date) => (
                            <option key={date.toString()} value={formatDateString(date)}>
                                {moment(date).format('DD.MM.YYYY')}
                            </option>
                        ))}
                    </Form.Select>
                </div>

                <div className="settings__control">
                    <Form.Label htmlFor="beforeDropdown">До</Form.Label>
                    <Form.Select
                        id="beforeDropdown"
                        value={beforeSelectedDate ? formatDateString(beforeSelectedDate) : ''}
                        onChange={(event) => handleChangeDate(event, setBeforeSelectedDate)}>
                        <option value="">Выберите</option>
                        {beforeDate.map((date) => (
                            <option key={date.toString()} value={formatDateString(date)}>
                                {moment(date).format('DD.MM.YYYY')}
                            </option>
                        ))}
                    </Form.Select>
                </div>

                <div className="settings__control">
                    <Form.Label htmlFor="withHours">Выберите время:</Form.Label>
                    <Form.Select
                        name="withHours"
                        value={selectedTime}
                        onChange={(event) => handleChange(event, setSelectedTime)}>
                        <option value="">Выберите</option>
                        {time.map((date) => (
                            <option key={date} value={date}>
                                {date}
                            </option>
                        ))}
                    </Form.Select>
                </div>

                <div className="settings__control">
                    <Form.Label htmlFor="beforeHours">До</Form.Label>
                    <Form.Select
                        name="beforeHours"
                        value={beforeSelectedTime}
                        onChange={(event) => handleChange(event, setBeforeSelectedTime)}>
                        <option value="">Выберите</option>
                        {time.map((date) => (
                            <option key={date} value={date}>
                                {date}
                            </option>
                        ))}
                    </Form.Select>
                </div>
                <Discount onCalculate={handleCalculationResult} />

                <Button className='settings__btn' onClick={priceSave}>Задать</Button>
            </div>
        }
    }

    const priceSave = () => {
        const fieldId = fields.filter(item => item.fieldName === selectField)[0]._id;
        const priceObject = {
            startDate: selectedDate,
            startTime: selectedTime,
            endDate: beforeSelectedDate,
            endTime: beforeSelectedTime,
            fieldName: selectField,
            fieldId,
            resultPrice
        }
        Meteor.call('price.insert', priceObject)
    }
    return (
        <div>
            <div className="settings__control">

                <CreateFields />

                <Form.Label>Название площадки</Form.Label>
                <Form.Select
                    value={selectField}
                    onChange={(event) => handleChange<string>(event, setSelectField)}
                    aria-label="Название площадки">
                    <option value=''>Выберите</option>
                    {fields.map((item) => (
                        <option>
                            {item.fieldName}
                        </option>
                    ))}
                </Form.Select>
                {settingsForFields()}
            </div>
        </div>
    )
}

export default FieldsSettings;