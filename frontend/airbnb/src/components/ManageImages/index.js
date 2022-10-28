import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchSpotById, sendSpotImgData, deleteSpotImgData } from '../../store/spots.js';

import './styles.css';

const ManageImages = () => {
    const dispatch = useDispatch();
    const spotId = useParams();
    const [clicked, setClicked] = useState(false);

    const [url, setUrl] = useState('');
    const [previewImage, setPreviewImage] = useState(false);

    useEffect(() => {
        dispatch(fetchSpotById(spotId.spotId))
    }, [dispatch]);

    const spotData = useSelector(state => state.spots.currSpot);
    const imgData = useSelector(state => state.spots.currSpot.SpotImages);

    const handleSubmit = () => {
        dispatch(sendSpotImgData(spotId.spotId, {url, previewImage}))
    };

    if (spotData) return (
        <div id='manage-images'>
            <div id='manage-spot-images-container'>
                {spotData.SpotImages.length > 0 && <div id='current-images'><p id='header'>Current Images</p></div>}

                {
                    spotData.SpotImages.length > 0 && imgData ?
                    spotData.SpotImages.map((img, i) => {
                        return (
                            <div id='spot-images-div'>
                                <div>
                                    <img src={img.url} key={i} id='manage-spot-images'></img>
                                </div>
                                <div id='delete-image-div'><button id='delete-image-button' onClick={() => dispatch(deleteSpotImgData(i, imgData[i].id))}>Delete</button></div>
                            </div>
                        )
                    }) : <p><i>No images to display</i></p>
                }
            </div>

            <div id='add-images'>
                <button id='add-image-button' onClick={() => setClicked(clicked => !clicked)}>Add an Image</button>
            </div>

            {
                clicked && 
                <div id='form-container'>
                    <form id='image-form' onSubmit={handleSubmit}>
                        <label className='image-form-holders'>
                            <input
                            id='manage-photos-input'
                            type='text'
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                            placeholder='image URL'
                            ></input>
                        </label>

                        <div className='image-form-holders'>
                            <p>Is this a preview image?</p>
                            <label className='preview-radio'>
                                Yes
                                <input
                                    type="radio"
                                    value={true}
                                    name="previewImage"
                                    onChange={() => setPreviewImage(true)}
                                    checked={previewImage === true}/>
                            </label>

                              <label className='preview-radio'>
                                No
                                <input
                                    type="radio"
                                    value={false}
                                    name="previewImage"
                                    onChange={() => setPreviewImage(false)}
                                    checked={previewImage === false}/>
                            </label>
                        </div>

                        <button id='add-image' type='submit'>Add</button>
                    </form>
                </div>
            }
        </div>
    )
};

export default ManageImages;