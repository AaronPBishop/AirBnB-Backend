import Calendar from 'react-calendar'

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'

import { sendBookingData } from '../../store/bookings';

import './styles.css';

const CreateBookingForm = ({ spotId, price }) => {
    const dispatch = useDispatch();

    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState('');

    const [clickedReserve, setClickedReserve] = useState(0);
    const [clickedCheckIn, setClickedCheckIn] = useState(false);
    const [clickedCheckOut, setClickedCheckOut] = useState(false);
    console.log(checkIn)

    return (
        <div id='create-booking-card'
        style={{
            backgroundColor: 'white',
            minWidth: '16vw',
            maxWidth: '18vw',
            border: '1px solid rgb(220, 220, 220)',
            borderRadius: '8px',
            padding: '20px'
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
                maxWidth: '11.5vw'
            }}
            id='booking-dates'>

                <button 
                style={{
                    border: 'none', 
                    backgroundColor: 'white', 
                    cursor: 'pointer', 
                    fontFamily: 'Montserrat', 
                    fontWeight: 'bold',
                    borderBottom: clickedCheckIn ? '2px solid black' : 'none'
                }}
                onClick={() => {
                    setClickedCheckOut(false);
                    setClickedCheckIn(checked => !checked);
                }}>
                    CHECK-IN
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
                </button>

            </div>

            <div 
                id='checkin-booking-calendar'
                style={{display: clickedCheckIn ? 'flex' : 'none'}}>
                    <Calendar value={checkIn} onChange={(e) => setCheckIn(e)}></Calendar>
            </div>

            <div 
                id='checkout-booking-calendar'
                style={{display: clickedCheckOut ? 'flex' : 'none'}}>
                    <Calendar value={checkOut} onChange={(e) => setCheckOut(e)}></Calendar>
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
                    fontWeight: 'bold'
                }}
                onClick={() => {
                    setClickedReserve(clickedReserve + 1);

                    if (clickedReserve === 2) dispatch(sendBookingData(spotId, {checkIn, checkOut}))
                }}>

                {
                    clickedReserve < 1 ? 
                    'Reserve' : 
                    'Confirm'
                }

            </button>

            <div id='booking-details'>
                <p>${price} x {checkOut - checkIn} nights</p>
                <p>${(checkOut - checkIn) * price}</p>
            </div>

            <div 
            style={{display: 'flex', justifyContent: 'space-evenly', borderTop: '1px solid rgb(220, 220, 220)', fontWeight: 'bold'}}
            id='booking-total'>
                <p>Total before taxes: </p>
                <p>${(checkOut - checkIn) * price}</p>
            </div>
        </div>
    );
};

export default CreateBookingForm;