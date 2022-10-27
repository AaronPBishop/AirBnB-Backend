import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotReviews } from '../../store/reviews.js';

import './styles.css';

const Reviews = ({ spotId, avgRating }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSpotReviews(spotId));
    }, []);

    const reviews = useSelector(state => state.reviews);

    const reviewsArr = [];
    for (let key in reviews) {
        const currReview = reviews[key];

        reviewsArr.push(currReview);
    };

    return (
        <div>
            <p id='header'>⭐ {avgRating} - {reviewsArr.length} reviews</p>

            <div id='reviews-container'>
                {reviewsArr.map((review, i) => {
                    return <div id='individual-reviews' key={i}>
                                <p id='review-username'><b>{review.User.firstName}:</b></p> 
                                <p>{review.review}</p>
                            </div>
                })}
            </div>
        </div>
    );
};

export default Reviews;