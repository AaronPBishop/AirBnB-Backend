import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { sendSpotImgData, feedImgFormData } from '../../store/spots.js';
import { addTempReviewImg, addMoreReviewImages } from '../../store/reviews.js';
import { displayImgForm } from '../../store/images.js';

const AddImageForm = ({ type, spotId, reviewId }) => {
    const dispatch = useDispatch();

    const [url, setUrl] = useState('');
    const [previewImage, setPreviewImage] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [visible, setVisible] = useState(true);

    const imgState = useSelector(state => state.images);

    let display;
    if (imgState.displayImgForm) display = imgState.displayImgForm;

    useEffect(() => {
        setVisible(display);
    }, [display]);

    return (
        <div 
            id={type !== 'createSpot' ? 'form-container' : 'new-spot-form-container'}
            style={{visibility: type !== 'createSpot' && type !== 'createReview' && visible === undefined ? 'hidden' : 'visible'}}>

            <form id={type !== 'createSpot' ? 'image-form' : 'new-spot-image-form'}>

                <label className='image-form-holders'>
                    <input
                    id={type !== 'createSpot' && type !== 'createReview' ? 'photos-input' : 'new-spot-photos-input'}
                    type='text'
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder='image URL'
                    ></input>
                </label>
                
                {
                    type !== 'createSpot' && type !== 'createReview' && 
                    <div className='image-form-holders'>

                    <p style={{fontFamily: 'Montserrat', fontWeight: 'bold', fontStyle: 'italic'}}>Is this a preview image?</p>

                    <label className='preview-radio' style={{fontFamily: 'Montserrat', fontWeight: 'bold'}}>
                        Yes
                        <input
                            type="radio"
                            value={true}
                            name="previewImage"
                            onChange={() => setPreviewImage(true)}
                            checked={previewImage === true}/>
                    </label>

                    <label className='preview-radio' style={{fontFamily: 'Montserrat', fontWeight: 'bold'}}>
                        No
                        <input
                            type="radio"
                            value={false}
                            name="previewImage"
                            onChange={() => setPreviewImage(false)}
                            checked={previewImage === false}/>
                    </label>

                    </div>
                }

                <button id={type !== 'createSpot' ? 'add-image' : 'new-spot-add-image'} onClick={e => {
                    e.preventDefault();
                    setClicked(true);

                    if (type === 'createSpot') dispatch(feedImgFormData(url));

                    if (type === 'createReview') dispatch(addTempReviewImg(url, previewImage));

                    if (type === 'editSpot') {
                        dispatch(sendSpotImgData(spotId.spotId, url, previewImage));
                        dispatch(displayImgForm(false));
                    };


                    if (type === 'editReview') {
                        dispatch(addMoreReviewImages(url, previewImage, reviewId));
                        dispatch(displayImgForm(false));
                    };
                }}>
                    {
                        type !== 'editSpot' && type !== 'editReview' && clicked === true ? 
                        <p style={{position: 'relative', right: '0.35vw', fontStyle: 'italic'}}>Added</p> 
                        : <p>Add</p>
                    }
                </button>

                {
                    type === 'createReview' || type === 'createSpot' &&
                    <p style={{fontFamily: 'Montserrat', position: 'absolute', top: '9.8vh', right: '17vw', fontSize: '11px', fontStyle: 'italic'}}>
                    You can add more images later
                    </p>
                }

            </form>

        </div>
    )
};

export default AddImageForm;