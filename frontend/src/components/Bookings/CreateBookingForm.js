import Calendar from 'react-calendar'

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { sendBookingData, getSpotBookingData, rerenderBookings, editBookingData } from '../../store/bookings';
import { fetchSpotById } from '../../store/spots.js';

import './styles.css';

const CreateBookingForm = ({ spotId, price, type, bookingId }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [calendarCheckInDate, setCalendarCheckInDate] = useState(new Date());
    const [calendarCheckOutDate, setCalendarCheckOutDate] = useState('');

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    
    const [totalDays, setTotalDays] = useState(0);

    const [clickedReserve, setClickedReserve] = useState(0);
    const [clickedCheckIn, setClickedCheckIn] = useState(false);
    const [clickedCheckOut, setClickedCheckOut] = useState(false);

    const [completed, setCompleted] = useState(false);
    const [errors, setErrors] = useState([]);

    const [showAllBookings, setShowAllBookings] = useState(false);

    useEffect(() => {
        if (!type) dispatch(rerenderBookings());
        if (type) dispatch(fetchSpotById(spotId));

        dispatch(getSpotBookingData(spotId));
    }, [dispatch]);

    const spotBookings = useSelector(state => state.bookings);
    const spotData = useSelector(state => state.spots);

    let currSpot;
    if (type) currSpot = spotData.currSpot;
    if (!price && currSpot) price = currSpot.price;

    const bookingsArr = [];
    for (let key in spotBookings) {
        const currBooking = spotBookings[key];
        bookingsArr.push(currBooking)
    };

    useEffect(() => {
        const errorsArr = [];

        if (checkIn.length > 0 && checkOut.length > 0) {
            setCompleted(true);

            const oneDay = 24 * 60 * 60 * 1000;

            const [checkInYear, checkInMonth, checkInDay] = checkIn.split('-');
            const [checkOutYear, checkOutMonth, checkOutDay] = checkOut.split('-');

            const firstDate = new Date(checkInYear, checkInMonth, checkInDay);
            const secondDate = new Date(checkOutYear, checkOutMonth, checkOutDay);

            const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

            setTotalDays(diffDays);

            for (let key in spotBookings) {
                const currBooking = spotBookings[key];
                const { startDate, endDate } = currBooking;
                
                if (startDate === checkIn && endDate === checkOut) errorsArr.push('This spot is already booked for those dates.')

                if (new Date(checkIn) >= new Date(startDate) && new Date(checkIn) <= new Date(endDate)) errorsArr.push('Start date conflicts with an existing booking');

                if (new Date(checkOut) <= new Date(endDate) && new Date(checkOut) >= new Date(startDate)) errorsArr.push('End date conflicts with an existing booking');

                if (new Date(checkOut) <= new Date(checkIn)) errorsArr.push('Checkout date cannot be on or before checkin date');

                if (new Date(checkIn).getTime() < new Date()) errorsArr.push('Checkin date cannot be on or before present day');
            };

            setErrors(errorsArr);
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
            <p style={{display: errors.length < 1 ? 'block' : 'none', marginLeft: '1vw', fontSize: '20px'}}><b>${price}</b> night</p>

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
                disabled={showAllBookings === true}
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
                disabled={showAllBookings === true}
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
                style={{display: clickedCheckIn ? 'flex' : 'none', visibility: showAllBookings === true ? 'hidden' : 'visible'}}>
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
                style={{display: clickedCheckOut ? 'flex' : 'none', visibility: showAllBookings === true ? 'hidden' : 'visible'}}>
                    <Calendar 
                    value={calendarCheckOutDate} 
                    onChange={(e) => {
                        const year = e.getUTCFullYear();
                        const month = e.getMonth() + 1;
                        const day = e.getUTCDate();
                        
                        const newDate = year + "-" + month + "-" + day;

                        setCalendarCheckOutDate(e);
                        setCheckOut(newDate);
                    }}
                    />
            </div>

            <div 
            id={'bookings-errors'}
            style={{display: showAllBookings === true ? 'flex' : 'none', justifyContent: bookingsArr.length < 3 && 'center', marginTop: '-38vh', overflowX: 'auto', maxHeight: '20vh'}}>
                {bookingsArr.map((booking, i) => {
                return (
                    <div 
                    key={i}
                    style={{
                        display: 'flex', 
                        justifyContent: 'center',
                        minWidth: '6vw',
                        maxWidth: '6vw',
                        listStyle: 'none', 
                        fontWeight: 'bold', 
                        flexWrap: 'wrap',
                        backgroundColor: '#6f019c',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        margin: '6px',
                        padding: '6px'
                    }}>
                        <li>{booking.startDate}</li>
                        <p style={{fontWeight: '400', fontStyle: 'italic'}}>thru</p>
                        <li>{booking.endDate}</li>
                    </div>
                    )
                })}
            </div>

            <div 
            id='bookings-errors-functionality'
            style={{display: errors.length > 0 ? 'block' : 'none', textAlign: 'center', fontWeight: 'bold'}}>
                <p style={{position: 'relative', top: '0.5vh'}}>{errors[0]}</p>

                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button 
                    style={{
                        border: 'none', 
                        backgroundColor: 'white', 
                        fontFamily: 'Montserrat',
                        fontSize: '16px', 
                        textDecoration: 'underline', 
                        cursor: 'pointer'
                    }}
                    onClick={() => setShowAllBookings(show => !show)}>
                        {
                            showAllBookings ?
                            'Back to Dates' :
                            'See All Bookings'
                        }
                    </button>
                </div>
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
                        if (type === 'edit') {
                            dispatch(editBookingData(bookingId, {startDate: checkIn, endDate: checkOut}));
                            window.location.reload(false);
                            return;
                        };
                        
                        dispatch(sendBookingData(spotId, {startDate: checkIn, endDate: checkOut}));

                        history.push('/manage-account');
                    };
                }}
                
                disabled={completed === false || errors.length > 0}
                >

                {
                    clickedReserve < 1 ? 
                    'Reserve' : 
                    'Confirm'
                }

            </button>

            <div id='booking-details'>
                <p>${price} x {totalDays} nights</p>
                <p>${(totalDays * price).toFixed(2)}</p>
            </div>

            <div 
            style={{display: 'flex', justifyContent: 'space-evenly', borderTop: '1px solid rgb(220, 220, 220)', fontWeight: 'bold'}}
            id='booking-total'>
                <p>Total before taxes: </p>
                <p>${(totalDays * price).toFixed(2)}</p>
            </div>
        </div>
    );
};

export default CreateBookingForm;