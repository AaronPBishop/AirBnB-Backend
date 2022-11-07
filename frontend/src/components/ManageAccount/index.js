import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { toggleEditMode } from '../../store/reviews.js';

import Reviews from '../Reviews/index.js';
import CreateReview from '../Reviews/CreateReview.js'

import './styles.css';

const ManageAccount = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const [clicked, setClicked] = useState(false);

    const reviews = useSelector(state => state.reviews);

    let editMode;
    let reviewId;
    if (reviews.editMode) {
        editMode = reviews.editMode.boolean;
        reviewId = reviews.editMode.reviewId
    };

    document.body.style.overflowY = 'scroll';

    if (user) return (
        <div id='manage-account-container'>
            <div id='welcome-header'><p>Welcome back, {user.firstName}!</p></div>

            <div id='manage-reviews-button-div'><button id='manage-reviews-button' onClick={() => {
                dispatch(toggleEditMode(false));
                setClicked(clicked => !clicked);
            }}>Manage your Reviews</button></div>
            
            <div id={clicked ? 'account-reviews' : 'hide-account-reviews'}>
                    {
                        editMode === true ? <CreateReview type='edit' reviewId={reviewId} />
                        : <Reviews type='user' />
                    }
            </div>
        </div>
    );
};


export default ManageAccount;