import Calendar from 'react-calendar'

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import { sendBookingData } from '../../store/bookings';

import './styles.css';

const CreateBookingForm = ({ spotId, price }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [calendarCheckInDate, setCalendarCheckInDate] = useState('');
    const [calendarCheckOutDate, setCalendarCheckOutDate] = useState('');

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    
    const [totalDays, setTotalDays] = useState(0);

    const [clickedReserve, setClickedReserve] = useState(0);
    const [clickedCheckIn, setClickedCheckIn] = useState(false);
    const [clickedCheckOut, setClickedCheckOut] = useState(false);

    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (checkIn.length > 0 && checkOut.length > 0) {
            setCompleted(true);

            const oneDay = 24 * 60 * 60 * 1000;

            const [checkInYear, checkInMonth, checkInDay] = checkIn.split('-');
            const [checkOutYear, checkOutMonth, checkOutDay] = checkOut.split('-');

            const firstDate = new Date(checkInYear, checkInMonth, checkInDay);
            const secondDate = new Date(checkOutYear, checkOutMonth, checkOutDay);

            const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

            setTotalDays(diffDays);
        };
    }, [checkIn, checkOut]);

    return (
        <div id='create-booking-card'
        style={{
            boxShadow: '0px 1px 10px -5px rgb(65, 65, 65)',
            backgroundColor: 'white',
            minWidth: '16vw',
            maxWidth: '18vw',
            border: '1px solid rgb(220, 220, 220)',
            borderRadius: '8px',
            padding: '20px',
        }}>
            <p style={{marginLeft: '1vw', fontSize: '20px'}}><b>${price}</b> night</p>

            <div 
            style={{
                marginLeft: '3.4vw',
                display: 'flex',
                justifyContent: 'space-evenly',
                border: '1px solid rgb(220, 220, 220)', 
                borderRadius: '8px',
                minHeight: '5vh',
                maxWidth: '11.5vw',
                paddingTop: checkIn && '2vh'
            }}
            id='booking-dates'>

                <button 
                style={{
                    border: 'none', 
                    backgroundColor: 'white', 
                    cursor: 'pointer', 
                    fontFamily: 'Montserrat', 
                    fontWeight: 'bold',
                    borderBottom: clickedCheckIn ? '2px solid black' : 'none',
                }}
                onClick={() => {
                    setClickedCheckOut(false);
                    setClickedCheckIn(checked => !checked);
                }}>
                    CHECK-IN
                    {checkIn && <p>{checkIn.toString()}</p>}
                </button>

                <button 
                style={{
                    border: 'none', 
                    backgroundColor: 'white', 
                    cursor: 'pointer', 
                    fontFamily: 'Montserrat', 
                    fontWeight: 'bold',
                    borderBottom: clickedCheckOut ? '2px solid black' : 'none'
                }}
                onClick={() => {
                    setClickedCheckIn(false);
                    setClickedCheckOut(checked => !checked);
                }}>
                    CHECKOUT
                    {checkOut && <p>{checkOut.toString()}</p>}
                </button>

            </div>

            <div 
                id='checkin-booking-calendar'
                style={{display: clickedCheckIn ? 'flex' : 'none'}}>
                    <Calendar 
                    value={calendarCheckInDate} 
                    onChange={(e) => {
                        const year = e.getUTCFullYear();
                        const month = e.getMonth() + 1;
                        const day = e.getUTCDate();
                        
                        const newDate = year + "-" + month + "-" + day;

                        setCalendarCheckInDate(e);
                        setCheckIn(newDate);
                    }} 
                    className={'react-calendar'} 
                    />
            </div>

            <div 
                id='checkout-booking-calendar'
                style={{display: clickedCheckOut ? 'flex' : 'none'}}>
                    <Calendar 
                    value={calendarCheckOutDate} 
                    onChange={(e) => {
                        const year = e.getUTCFullYear();
                        const month = e.getMonth() + 1;
                        const day = e.getUTCDate();
                        
                        const newDate = year + "-" + month + "-" + day;

                        setCalendarCheckOutDate(e);
                        setCheckOut(newDate);

                        // const oneDay = 24 * 60 * 60 * 1000;

                        // const [checkInYear, checkInMonth, checkInDay] = checkIn.split('-');
                        // const [checkOutYear, checkOutMonth, checkOutDay] = checkOut.split('-');

                        // const firstDate = new Date(checkInYear, checkInMonth, checkInDay);
                        // const secondDate = new Date(checkOutYear, checkOutMonth, checkOutDay);

                        // const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

                        // setTotalDays(diffDays);
                    }}
                    />
            </div>

            <button
                style={{
                    marginLeft: '1vw',
                    marginTop: '2vh',
                    background: 'linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%)',
                    borderRadius: '8px',
                    color: 'white',
                    fontFamily: 'Montserrat',
                    minWidth: '250px',
                    minHeight: '40px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    cursor: clickedReserve < 1 ? 'cursor' : 'pointer'
                }}

                onClick={() => {
                    setClickedReserve(clickedReserve + 1);

                    if (clickedReserve === 2) {
                        dispatch(sendBookingData(spotId, {startDate: checkIn, endDate: checkOut}));
                        history.push('/manage-account');
                    };
                }}
                
                disabled={completed === false}
                >

                {
                    clickedReserve < 1 ? 
                    'Reserve' : 
                    'Confirm'
                }

            </button>

            <div id='booking-details'>
                <p>${price} x {totalDays} nights</p>
                <p>${(totalDays) * price}</p>
            </div>

            <div 
            style={{display: 'flex', justifyContent: 'space-evenly', borderTop: '1px solid rgb(220, 220, 220)', fontWeight: 'bold'}}
            id='booking-total'>
                <p>Total before taxes: </p>
                <p>${(totalDays) * price}</p>
            </div>
        </div>
    );
};

export default CreateBookingForm;