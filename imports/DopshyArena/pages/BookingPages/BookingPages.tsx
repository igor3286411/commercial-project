import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import { RootState } from '../../../redux/store/store';
import { useSelector } from 'react-redux'
import DatesAndTimes from '../../components/DatesAndTimes/DatesAndTimes.tsx';
import allDaysMonth from '../../../helpers/hocs/allDaysMonth.tsx';
import { User } from '../../../helpers/types/types.tsx';
import { useLocation } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { useBooking } from '../../../helpers/hooks/useBookingDays.tsx';
import 'moment/locale/ru'
import './BookingPages.scss';

interface IBookingPagesProps {
  checkUser: () => void;
}

const BookingPages: React.FC<IBookingPagesProps> = ({ checkUser }) => {
  moment.locale('ru');
  const [datesInMonth, setDatesInMonth] = useState<Date[]>([]);
  const [hoursArray, setHoursArray] = useState<number[]>([]);

  const location = useLocation();
  const fieldId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)

  //@ts-ignore
  const user: User = Meteor.user();

  const bookedDays = useSelector((state: RootState) => state.bookedDayReducer.value);

  const { isBookingLoading } = useBooking();

  useEffect(() => {
    allDaysMonth(setDatesInMonth, setHoursArray)
    checkUser();
  }, [])

  const bookingHandler = () => {
    const bookedDaysArray = {
      clientName: user.profile?.name,
      clientSurname: user.profile?.surname,
      clientPhone: user.profile?.phone,
      clientEmail: user.profile?.email,
      bookedDays,
      fieldId
    }
    Meteor.call('booking.insert', bookedDaysArray)
  }

  return (
    <div className="booking__container">
      {!isBookingLoading ?
        <div>
          <div className='booking__panel'>{bookedDays.map(item =>
            <th>{moment(item).format('DD MMMM')},
              {moment(item).format('dd')} на 1 ч. с {moment(item).format("HH:mm")}</th>)}
            {bookedDays.length !== 0 ? <button onClick={bookingHandler}>Забронировать</button> : ''}
          </div>
          <Table striped bordered hover>
            <thead>
              <th></th>
              {datesInMonth.map((item, i) => {
                return <th key={i}>{moment(item).format('DD MMMM')} <br /> {moment(item).format('dd')}</th>
              })}
            </thead>
            <tbody>
              {hoursArray.map((item, i) => {
                return <tr
                  key={i}>
                  <td>
                    {item}
                  </td>
                  {datesInMonth.map((day, i) => {
                    const numberDay = day.getDate();
                    return <DatesAndTimes key={i} date={day} hours={item} fieldId={fieldId} />
                  })}
                </tr>
              })}
            </tbody>
          </Table>
        </div>
        : <TailSpin />}
    </div>
  );
};

export default BookingPages;
