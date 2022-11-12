import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { rerenderBookings, getUserBookingData, deleteBookingData } from "../../store/bookings";
import { setCurrSpotId } from '../../store/spots.js';

const UserBookings = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(rerenderBookings());

        dispatch(getUserBookingData());
    }, [dispatch]);

    const bookings = useSelector(state => state.bookings);

    const bookingsArr = [];
    for (let key in bookings) {
        const currBooking = bookings[key];

        bookingsArr.push(currBooking)
    };
    console.log(bookingsArr)

    if (bookings) return (
        <div 
        id={'user-bookings-main'}
        style={{display: 'flex', justifyContent: 'center', marginTop: '-38vh', overflowX: 'auto'}}>
            {
                bookingsArr.map((booking, i) => {
                    return (
                        <div>
                            <div 
                            key={i}
                            style={{
                                display: 'flex', 
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                boxSizing: 'content-box',
                                minWidth: '6vw',
                                maxWidth: '6vw',
                                listStyle: 'none', 
                                fontWeight: 'bold', 
                                flexWrap: 'wrap',
                                backgroundColor: '#6f019c',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                marginRight: '10px',
                                marginLeft: '10px',
                                padding: '6px'
                            }}>
                                <li>{booking.startDate}</li>
                                <p style={{fontWeight: '400', fontStyle: 'italic'}}>thru</p>
                                <li>{booking.endDate}</li>
                                <button 
                                style={{
                                    minWidth: '6vw',
                                    marginTop: '2vh', 
                                    backgroundColor: '#3a0051', 
                                    border: 'none',
                                    borderBottom: '#a6223a', 
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}>
                                    <NavLink 
                                    to={`/spots/${booking.spotId}`} 
                                    className='navlinks'
                                    onClick={() => dispatch(setCurrSpotId(booking.spotId))}>
                                        <p style={{fontFamily: 'Montserrat', fontWeight: 'bold', color: 'white'}}>Spot {booking.spotId}</p>
                                    </NavLink>
                                </button>
                            </div>

                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <button 
                                style={{ 
                                    minHeight: '4vh',
                                    margin: '2px', 
                                    color: 'white', 
                                    backgroundColor: '#FF385C', 
                                    border: '#FF385C',
                                    borderBottom: '#a6223a', 
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}>
                                    Edit
                                </button>

                                <button
                                style={{
                                    minHeight: '4vh',
                                    margin: '2px', 
                                    color: 'white', 
                                    backgroundColor: '#FF385C', 
                                    border: '#FF385C',
                                    borderBottom: '#a6223a', 
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => dispatch(deleteBookingData(booking.bookingId))}>
                                    Delete
                                </button>
                            </div>
                        </div>
                        )
                })
            }
        </div>
    );
};

export default UserBookings;