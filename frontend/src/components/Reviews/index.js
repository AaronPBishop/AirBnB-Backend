import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreateReview from "../Reviews/CreateReview.js";
import IndividualReviews from './IndividualReviews.js';

import { fetchSpotReviews, fetchUserReviews, rerenderReviews } from '../../store/reviews.js';

import './styles.css';

const Reviews = ({ spotId, avgRating, type }) => {
    const dispatch = useDispatch();

    const submitted = useSelector(state => state.reviews.submitted);

    useEffect(() => {
        dispatch(rerenderReviews());

        if (type === 'spot') dispatch(fetchSpotReviews(spotId));
        if (type === 'user') dispatch(fetchUserReviews());
    }, [dispatch, submitted]);

    const reviews = useSelector(state => state.reviews);

    const reviewsArr = [];
    for (let key in reviews) {
        const currReview = reviews[key];

        if (key.match(/[0-9]/)) reviewsArr.push(currReview);
    };

    document.body.style.overflowY = 'scroll';

    if (!reviews) return <p className='no-content'>Nothing to show here!</p>
    if (reviews) return (
        <div>
            {
                type === 'spot' && 
                <div id='reviews-header'>
                    <p style={{
                        position: 'absolute', 
                        fontWeight: '800', 
                        bottom: '5vh'}}>
                        ⭐ {avgRating} - {reviewsArr.length} reviews
                    </p>
                    <CreateReview spotId={spotId} />
                </div>
            }

            <div id='reviews-container'>
                {reviewsArr.map((review, i) => {
                    return <IndividualReviews review={review} i={i} type={type} key={i} />
                })}
            </div>
        </div>
    );
};

export default Reviews;