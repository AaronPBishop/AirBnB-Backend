import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { toggleEditMode } from '../../store/reviews.js';

import Reviews from '../Reviews/index.js';
import CreateReview from '../Reviews/CreateReview.js'

import UserBookings from '../Bookings/UserBookings.js';

import './styles.css';

const ManageAccount = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const [clickedMngReviews, setClickedMngReviews] = useState(false);
    const [clickedMngBookings, setClickedMngBookings] = useState(false);

    const reviews = useSelector(state => state.reviews);

    let editMode;
    let reviewId;
    if (reviews.editMode) {
        editMode = reviews.editMode.boolean;
        reviewId = reviews.editMode.reviewId
    };

    document.body.style.overflowY = 'scroll';

    if (user) return (
        <div 
        id='manage-account-container'
        style={{
                background: 'linear-gradient(to left,#D70466 0%,#BD1E59 30%,#92174D 55%,#861453 72.5%,#6C0D63 90%,#6C0D63 100%)',
                minHeight: '40vh',
                maxHeight: '40vh',
                borderRadius: '8px'
            }}>
            <div id='welcome-header'>
                <p>Welcome back, {user.firstName}!</p>
            </div>

            <div id='manage-reviews-button-div'>
                <button 
                className='manage-account-buttons' 
                onClick={() => {
                    dispatch(toggleEditMode(false));
                    setClickedMngReviews(clicked => !clicked);
                    setClickedMngBookings(false);
                }}>
                    Manage your Reviews
                </button>
            </div>

            <div id='manage-reviews-button-div'>
                <button 
                className='manage-account-buttons' 
                onClick={() => {
                    setClickedMngBookings(clicked => !clicked);
                    setClickedMngReviews(false);
                }}>
                    Manage your Bookings
                </button>
            </div>
            
            <div 
            id={'account-reviews'}
            style={{visibility: clickedMngReviews ? 'visible' : 'hidden', position: 'relative', top: '2vh'}}>
                    {
                        editMode === true ? <CreateReview type='edit' reviewId={reviewId} />
                        : <Reviews type='user' />
                    }
            </div>

            <div 
            id={'account-bookings'}
            style={{visibility: clickedMngBookings ? 'visible' : 'hidden'}}>
                    {
                        <UserBookings />
                    }
            </div>
        </div>
    );
};


export default ManageAccount;