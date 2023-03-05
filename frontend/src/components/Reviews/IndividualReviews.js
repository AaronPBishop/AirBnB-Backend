import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import DisplayReviewImages from './DisplayReviewImages.js';

import { toggleEditMode, deleteReviewData } from '../../store/reviews';

const IndividualReviews = ({ review, i, type }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [clicked, setClicked] = useState(false);

    const formatDate = (date) => {
        const dateArr = date.split('-')
        const year = dateArr[0];
        const splitYear = year.split('');
        const month = dateArr[1].concat('/');
        const dateString = dateArr[2].split('');
        return month.concat(dateString[0]).concat(dateString[1]).concat('/' + splitYear[2]).concat(splitYear[3]);
    };

    return <div id='individual-reviews' 
            style={{
                border: type === 'user' && '1px solid rgb(220, 220, 220)',
                borderRadius: '8px',
                paddingLeft: '7vw'
            }}>

            <p id='review-username'><b>{review.User.firstName}:</b></p> 

            <p style={{fontWeight: 'bold'}}>⭐ {review.stars}</p>

            {type === 'user' && <p>Spot: {review.spotId}</p>}

            <p>{review.review}</p>
            
            <p><i>{formatDate(review.createdAt)}</i></p>

            {
                type !== 'user' && review.ReviewImages.length === 1 ? 
                <button 
                    id='show-review-images' 
                    onClick={() => setClicked(true)}>
                        ... <i>{review.ReviewImages.length} image</i>
                </button> 
                : type !== 'user' && review.ReviewImages.length > 1 ?
                <button 
                    id='show-review-images' 
                    onClick={() => setClicked(true)}>
                        ... <i>{review.ReviewImages.length} images</i>
                </button>
                : null
            }

            {
                clicked &&
                
                <div 
                    id='review-images-component-container' 
                    onClick={() => setClicked(false)}>
                    <DisplayReviewImages 
                        imgArray={review.ReviewImages} 
                        clicked={clicked} 
                        imgCount={review.ReviewImages.length}
                    />
                </div>
            }

            {
                type === 'user' && 
                <div>
                    <button className='manage-user-review-buttons' 
                    onClick={() => dispatch(deleteReviewData(review.id))}>Delete</button>

                    <button className='manage-user-review-buttons'
                    onClick={() => dispatch(toggleEditMode(true, review.id))}>Edit</button>

                    <button className='manage-user-review-buttons' id='manage-photos' onClick={() => history.push(`/manage-photos/reviews/${review.id}`)}>Manage Photos</button>
                </div>
            }
    </div>
};

export default IndividualReviews;