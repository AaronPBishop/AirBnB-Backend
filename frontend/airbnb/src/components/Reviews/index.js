import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSpotReviews, toggleEditMode, deleteReviewData, fetchUserReviews, rerenderReviews } from '../../store/reviews.js';
import DisplayReviewImages from './DisplayReviewImages.js';

import './styles.css';

const Reviews = ({ spotId, avgRating, type }) => {
    const dispatch = useDispatch();

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        dispatch(rerenderReviews());

        if (type === 'spot') dispatch(fetchSpotReviews(spotId));
        if (type === 'user') dispatch(fetchUserReviews());
    }, [dispatch]);

    const reviews = useSelector(state => state.reviews);

    const reviewsArr = [];
    for (let key in reviews) {
        const currReview = reviews[key];

        if (key.match(/[0-9]/)) reviewsArr.push(currReview);
    };

    const formatDate = (date) => {
        const dateArr = date.split('-')
        const year = dateArr[0];
        const splitYear = year.split('');
        const month = dateArr[1].concat('/');
        const dateString = dateArr[2].split('');
        return month.concat(dateString[0]).concat(dateString[1]).concat('/' + splitYear[2]).concat(splitYear[3]);
    };

    if (reviews) return (
        <div>
            {type === 'spot' && <div id='ratings-header'><p id='header'>⭐ {avgRating} - {reviewsArr.length} reviews</p></div>}

            <div id='reviews-container'>
                {reviewsArr.map((review, i) => {
                    return <div id='individual-reviews' key={i}>

                                <p id='review-username'><b>{review.User.firstName}:</b></p> 

                                {type === 'user' && <p>Spot: {review.spotId}</p>}

                                <p>{review.review}</p>

                                <p><i>{formatDate(review.createdAt)}</i></p>

                                {review.ReviewImages.length ? 
                                <button id='show-review-images' onClick={() => setClicked(true)}>{review.ReviewImages.length} image</button> 
                                : null}

                                {
                                    clicked &&
                                    <div id='review-images-component-container' onClick={() => setClicked(false)}><DisplayReviewImages imgArray={review.ReviewImages} clicked={clicked} /></div>
                                }

                                {type === 'user' && 
                                    <div>

                                        <button className='manage-user-review-buttons' 
                                        onClick={() => dispatch(deleteReviewData(review.id))}>Delete</button>

                                        <button className='manage-user-review-buttons'
                                        onClick={() => dispatch(toggleEditMode(true, review.id))}>Edit</button>

                                    </div>
                                }

                            </div>
                })}
            </div>
        </div>
    );
};

export default Reviews;