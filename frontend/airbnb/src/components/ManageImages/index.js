import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchSpotById, deleteSpotImgData } from '../../store/spots.js';

import './styles.css';
import AddImageForm from './AddImageForm.js';

const ManageImages = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const spotId = useParams();

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        dispatch(fetchSpotById(spotId.spotId))
    }, [dispatch]);

    const selectSpot = useSelector(state => state.spots);

    let imgData;
    let spotData;
    if (selectSpot.currSpot) {
        spotData = selectSpot.currSpot;
        imgData = selectSpot.currSpot.SpotImages;
    };

    if (spotData) return (
        <div id='manage-images'>
            <div id='manage-spot-images-container'>
                {spotData.SpotImages.length > 0 && <div id='current-images'><p id='manage-images-header'>Current Images</p></div>}

                {
                    spotData.SpotImages.length > 0 && imgData ?
                    spotData.SpotImages.map((img, i) => {
                        return (
                            <div id='spot-images-div'>
                                <div>
                                    <img src={img.url} key={i} id='manage-spot-images'></img>
                                </div>
                                <div id='delete-image-div'><button id='delete-image-button' 
                                onClick={() => {
                                    dispatch(deleteSpotImgData(i, imgData[i].id)) 
                                    history.push('/manage-listings')}}>Delete</button></div>
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
                <AddImageForm spotId={spotId} />
            }
        </div>
    )
};

export default ManageImages;