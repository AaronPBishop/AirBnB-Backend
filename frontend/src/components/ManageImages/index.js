import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchSpotById, deleteSpotImgData } from '../../store/spots.js';
import { deleteReviewImgData, fetchUserReviews, toggleEditMode } from '../../store/reviews.js';

import './styles.css';
import AddImageForm from './AddImageForm.js';

const ManageImages = ({ type }) => {
    const dispatch = useDispatch();
    const typeId = useParams();

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (type === 'spot') dispatch(fetchSpotById(typeId.spotId))
        if (type === 'review') {
            dispatch(fetchUserReviews());
            dispatch(toggleEditMode(true, typeId.reviewId));
        };
    }, [dispatch]);

    const selectType = useSelector(state => state[type + 's']);

    let spotImgs;
    if (type === 'spot' && selectType.currSpot && selectType.currSpot.SpotImages) spotImgs = selectType.currSpot.SpotImages;

    let reviewImgs;
    if (type === 'review' && selectType[typeId.reviewId] && selectType[typeId.reviewId].ReviewImages) reviewImgs = selectType[typeId.reviewId].ReviewImages;

    document.body.style.overflowY = 'scroll';

    if (type === 'spot' && (spotImgs === undefined || !spotImgs.length || spotImgs.length < 1) || type === 'review' && (reviewImgs === undefined || !reviewImgs.length || reviewImgs.length < 1)) return <p className='no-content'>...Nothing to show here!</p>

    if (type === 'spot' && (spotImgs !== undefined && spotImgs.length && spotImgs.length > 0) || type ==='review' && (reviewImgs !== undefined && reviewImgs.length && reviewImgs.length > 0)) return (
        <div id='manage-images'>
            <div id='manage-spot-images-container'>
                {type === 'spot' && spotImgs.length > 0 || type === 'review' && reviewImgs.length > 0 && <div id='current-images'><p id='manage-images-header'>Current Images</p></div>}

                {
                    type === 'spot' && spotImgs.length > 0 ?
                    spotImgs.map((img, i) => {
                        return (
                            <div id='spot-images-div' key={i}>
                                <div>
                                    <img src={img.url} id='manage-spot-images'></img>
                                </div>
                                <div id='delete-image-div'><button id='delete-image-button' 
                                onClick={() => {
                                    dispatch(deleteSpotImgData(typeId.spotId, i, spotImgs[i].id)) 
                                    }}>Delete</button></div>
                            </div>
                        )
                    }) 
                    : type === 'review' && reviewImgs.length > 0 ?
                    reviewImgs.map((img, i) => {
                        return (
                            <div id='spot-images-div' key={i}>
                                <div>
                                    <img src={img.url} id='manage-spot-images'></img>
                                </div>
                                <div id='delete-image-div'><button id='delete-image-button' 
                                onClick={() => {
                                    dispatch(deleteReviewImgData(typeId.reviewId, i, img.id)) 
                                    }}>Delete</button></div>
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