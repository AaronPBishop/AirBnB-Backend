import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreateReview from "../Reviews/CreateReview.js";
import { fetchSpotReviews, toggleEditMode, deleteReviewData, fetchUserReviews, rerenderReviews } from '../../store/reviews.js';
import DisplayReviewImages from './DisplayReviewImages.js';

import './styles.css';

const Reviews = ({ spotId, avgRating, type }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [clicked, setClicked] = useState(false);

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

    const formatDate = (date) => {
        const dateArr = date.split('-')
        const year = dateArr[0];
        const splitYear = year.split('');
        const month = dateArr[1].concat('/');
        const dateString = dateArr[2].split('');
        return month.concat(dateString[0]).concat(dateString[1]).concat('/' + splitYear[2]).concat(splitYear[3]);
    };

    document.body.style.overflowY = 'scroll';

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
                    return <div id='individual-reviews' key={i}>

                                <p id='review-username'><b>{review.User.firstName}:</b></p> 

                                {type === 'user' && <p>Spot: {review.spotId}</p>}

                                <p>{review.review}</p>

                                <p><i>{formatDate(review.createdAt)}</i></p>

                                {
                                    type !== 'user' && review.ReviewImages.length === 1 ? 
                                    <button id='show-review-images' onClick={() => setClicked(true)}>... <i>{review.ReviewImages.length} image</i></button> 
                                    : type !== 'user' && review.ReviewImages.length > 1 ?
                                    <button id='show-review-images' onClick={() => setClicked(true)}>... <i>{review.ReviewImages.length} images</i></button>
                                    : null
                                }

                                {
                                    clicked &&
                                    <div id='review-images-component-container' onClick={() => setClicked(false)}><DisplayReviewImages imgArray={review.ReviewImages} clicked={clicked} imgCount={review.ReviewImages.length} reviewId={review.id} /></div>
                                }

                                {type === 'user' && 
                                    <div>

                                        <button className='manage-user-review-buttons' 
                                        onClick={() => dispatch(deleteReviewData(review.id))}>Delete</button>

                                        <button className='manage-user-review-buttons'
                                        onClick={() => dispatch(toggleEditMode(true, review.id))}>Edit</button>

                                        <button className='manage-user-review-buttons' id='manage-photos' onClick={() => history.push(`/manage-photos/reviews/${review.id}`)}>Manage Photos</button>

                                    </div>
                                }

                            </div>
                })}
            </div>
        </div>
    );
};

export default Reviews;