import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSpotReview } from '../../store/reviews.js';
import { editSpotReview, createReviewImage } from '../../store/reviews.js';
import AddImageForm from '../ManageImages/AddImageForm.js';

import './styles.css';

const CreateReview = ({ spotId, reviewId, type }) => {
    const dispatch = useDispatch();

    const [clicked, setClicked] = useState(false);
    const [clickedAddImg, setClickedAddImg] = useState(false);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const reviews = useSelector(state => state.reviews);
    
    let newReviewId;
    newReviewId = (Math.max(...useSelector(state => Object.keys(state.reviews))) + 1);
    if (newReviewId < 0) newReviewId = 0;

    const handleSubmit = () => {
      if (type === 'edit') dispatch(editSpotReview({review, stars: rating}, reviewId))
      else {
        if (reviews) {
          const newReview = reviews[newReviewId];

          let newReviewImages;
          if (newReview) {
            newReviewImages = newReview.ReviewImages;

            dispatch(createSpotReview({review, stars: rating}, spotId)).then(newReviewImages.map(img => dispatch(createReviewImage(img.url, img.preview, newReviewId))));
          };
        };
      };
    };

    return (
        <div id={clicked ? 'move-create-review-container' : 'create-review-container'}>
            {type !== 'edit' && 
            <button id={clicked ? 'hide-create-review-button' : 'create-review-button'} onClick={() => setClicked(true)}>Add a Review</button>}

            <div id={type === 'edit' ? 'edit-review-form' : clicked ? 'review-form' : 'review-form-hidden'}>
               <form>
                    <label>
                        <textarea
                        id='review-textarea'
                        type='textarea'
                        value={review}
                        onChange={e => setReview(e.target.value)}
                        placeholder='Review'>
                        </textarea>
                    </label>

                    <div className="star-rating">
                        {[...Array(5)].map((star, index) => {
                          index += 1;
                          return (
                            <button
                              id='stars-button'
                              type="button"
                              key={index}
                              className={index <= (hover || rating) ? "on" : "off"}
                              onClick={() => setRating(index)}
                              onMouseEnter={() => setHover(index)}
                              onMouseLeave={() => setHover(rating)}
                            >
                              <span className="stars">&#9733;</span>
                            </button>
                          );
                        })}
                        <p><b>{rating}</b></p>

                        <button id='review-add-img-button' onClick={e => {setClickedAddImg(true); e.preventDefault()}}>Add Image</button>
                    </div>

                    {
                      clickedAddImg &&
                      <div id='review-add-img-form'>
                        <div id='review-add-img-form-inner-div'>
                          <AddImageForm type='createReview' spotId={spotId} reviewId={newReviewId} />
                        </div>
                      </div>
                    }

                    <div>
                        <button id={type !== 'edit' ? 'submit-review' : 'submit-edit'} type='submit' onClick={handleSubmit}>
                          {type !== 'edit' ? <p style={{position: 'relative', bottom: '1.1vh'}}>Submit Review</p> 
                          : <p style={{position: 'relative', bottom: '1.1vh'}}>Confirm Changes</p>}
                        </button>
                    </div>
               </form>
            </div>
        </div>
    );
};

export default CreateReview;