import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchSpotById, deleteSpotImgData } from '../../store/spots.js';
import { deleteReviewImgData, toggleEditMode } from '../../store/reviews.js';

import './styles.css';
import AddImageForm from './AddImageForm.js';

const ManageImages = ({ type }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const typeId = useParams();

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (type === 'spot') dispatch(fetchSpotById(typeId.spotId))
        if (type === 'review') dispatch(toggleEditMode(true, typeId.reviewId));
    }, [dispatch]);

    const selectType = useSelector(state => state[type + 's']);

    let imgData;
    let spotData;
    if (type === 'spot' && selectType.currSpot) {
        spotData = selectType.currSpot;
        imgData = selectType.currSpot.SpotImages;
    };

    let reviewImgs;
    let reviewData;
    // if (type === 'review' && selectType[typeId.reviewId] && selectType[typeId.reviewId].ReviewImages) {
    //     reviewData = selectType[typeId.reviewId];
    //     reviewImgs = selectType[typeId.reviewId].ReviewImages;
    // };
    if (type === 'review' && selectType.editMode) {
        const editMode = selectType.editMode;

        let reviewId;
        if (editMode.reviewId) {
            reviewId = editMode.reviewId;
            
            if (selectType[reviewId] && selectType[reviewId].ReviewImages) {
                reviewData = selectType[editMode.reviewId];
                reviewImgs = selectType[editMode.reviewId].ReviewImages;
            };
        };
    };
    

    if (spotData || reviewData) return (
        <div id='manage-images'>
            <div id='manage-spot-images-container'>
                {type === 'spot' && spotData.SpotImages.length > 0 || type === 'review' && reviewImgs.length > 0 && <div id='current-images'><p id='manage-images-header'>Current Images</p></div>}

                {
                    type === 'spot' && spotData.SpotImages.length > 0 && imgData ?
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
                    }) 
                    : type === 'review' && reviewImgs.length > 0 ?
                    reviewImgs.map((img, i) => {
                        return (
                            <div id='spot-images-div'>
                                <div>
                                    <img src={img.url} key={i} id='manage-spot-images'></img>
                                </div>
                                <div id='delete-image-div'><button id='delete-image-button' 
                                onClick={() => {
                                    dispatch(deleteReviewImgData(typeId.reviewId, i, img.id)) 
                                    history.push('/manage-account')}}>Delete</button></div>
                            </div>
                        )
                    })
                    : <p><i>No images to display</i></p>
                }
            </div>

            <div id='add-images'>
                <button id='add-image-button' onClick={() => setClicked(clicked => !clicked)}>Add an Image</button>
            </div>

            {
                clicked && type === 'spot' ? 
                <AddImageForm type='editSpot' spotId={typeId} />
                : clicked && type === 'review' && <AddImageForm type='editReview' reviewId={typeId.reviewId} />
            }
        </div>
    )
};

export default ManageImages;