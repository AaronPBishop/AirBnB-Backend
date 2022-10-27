import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchSpotById, sendSpotImgData } from '../../store/spots.js';

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

    const handleSubmit = () => {
        dispatch(sendSpotImgData(spotId.spotId, {url, previewImage}))
    };

    if (spotData) return (
        <div>
            <div id='spot-images-container'>
                {spotData.SpotImages.length > 0 && <p id='current-images'>Current Images</p>}

                {
                    spotData.SpotImages.length > 0 ?
                    spotData.SpotImages.map((img, i) => {
                        return (
                            <div id='spot-image-div'>
                                <img src={img.url} key={i} id='spot-images'></img>
                                <button>Delete</button>
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
                <form id='image-form' onSubmit={handleSubmit}>
                    <label>
                        <input
                        type='text'
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        placeholder='image URL'
                        ></input>
                    </label>
                    
                    <div id='preview-image-form'>
                        Is this a preview image?
                        <label>
                            <input
                                type="radio"
                                value={true}
                                name="previewImage"
                                onChange={() => setPreviewImage(true)}
                                checked={previewImage === true}/>
                                Yes
                        </label>

                          <label>
                            <input
                                type="radio"
                                value={false}
                                name="previewImage"
                                onChange={() => setPreviewImage(false)}
                                checked={previewImage === false}/>
                                No
                        </label>
                    </div>
                    
                    <button id='add-image' type='submit'>Add</button>
                </form>
            }
        </div>
    )
};

export default ManageImages;