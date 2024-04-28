import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { setBookedDay } from '../../../redux/reducers/bookedDayReducer';
import Price from '../Price/Price';
import { useDispatch } from 'react-redux';
import { useBooking } from '../../../helpers/hooks/useBookingDays';
import './DatesAndTimes.scss';

interface DatesAndTimesProps {
    date: string;
    hours: string;
    fieldId: string;
}

const DatesAndTimes: React.FC<DatesAndTimesProps> = React.memo(({ date, hours, fieldId }) => {
    const combinedDateTime = moment(date).set({ hour: parseInt(hours.split(':')[0]), minute: parseInt(hours.split(':')[1]) });
    const { booking } = useBooking();
    const dispatch = useDispatch();

    const currentBookingField = booking.filter(item => item.fieldId === fieldId);

    const [colorChangeState, setColorChangeState] = useState('price-button');
    const dateString = combinedDateTime.toDate().toISOString();
    const nextDateString = new Date(combinedDateTime.toDate().getTime() + 30 * 60000).toISOString();
    const nextDate = new Date(combinedDateTime.toDate().getTime() + 30 * 60000)
    const beforeDate = new Date(combinedDateTime.toDate().getTime() - 30 * 60000)

    const checkBooked = currentBookingField.some(item => item?.bookedDays.includes(dateString));
    const handleButtonClick = () => {
        const newColorChangeState = checkBooked ? 'price-button__booking' : colorChangeState === 'price-button__active' ? 'price-button' : 'price-button__active';
        newColorChangeState !== 'price-button__booking' ? dispatch(setBookedDay(dateString)) && dispatch(setBookedDay(nextDateString)) : undefined;
        setColorChangeState(newColorChangeState)
        const nextButton = document.querySelector(`button[data-datetime="${nextDate}"]`)
        const beforeButton = document.querySelector(`button[data-datetime="${beforeDate}"]`)
        if (nextButton && beforeButton?.classList.contains('price-button')) {
            if (newColorChangeState === 'price-button__active') {
                nextButton.classList.remove('price-button')
                nextButton.classList.add('price-button__active')
            } else {
                nextButton.classList.remove('price-button__active')
                nextButton.classList.add('price-button')
            }
        }
    };
    return (
        <td>
            <div>
                <ul>
                    <li style={{ listStyle: 'none' }}>
                        <button
                            className={checkBooked ? 'price-button__booking' : colorChangeState  /* handleButtonClick() */}
                            data-datetime={combinedDateTime.toDate()}
                            onClick={handleButtonClick}>
                            <Price hours={hours} date={date} fieldId={fieldId} />
                        </button>
                    </li>
                </ul>
            </div>
        </td >
    )
});

export default DatesAndTimes;
