import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchSpotById, deleteSpotImgData } from '../../store/spots.js';
import { deleteReviewImgData, fetchUserReviews, toggleEditMode } from '../../store/reviews.js';
import { displayImgForm } from '../../store/images.js';

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

    useEffect(() => {
        dispatch(displayImgForm(true));
    }, [clicked]);

    const imgState = useSelector(state => state.images);

    let display;
    if (imgState.displayImgForm) display = imgState.displayImgForm;

    useEffect(() => {
        if (display === undefined) setClicked(false);
    }, [display]);

    const selectType = useSelector(state => state[type + 's']);

    let spotImgs;
    if (type === 'spot' && selectType.currSpot && selectType.currSpot.SpotImages) spotImgs = selectType.currSpot.SpotImages;

    let reviewImgs;
    if (type === 'review' && selectType[typeId.reviewId] && selectType[typeId.reviewId].ReviewImages) reviewImgs = selectType[typeId.reviewId].ReviewImages;

    document.body.style.overflowY = 'scroll';

    if (type === 'spot' && (spotImgs === undefined || !spotImgs.length || spotImgs.length < 1) || type === 'review' && (reviewImgs === undefined || !reviewImgs.length || reviewImgs.length < 1)) return (
        <div>

            <div
            style={{
                    display: 'flex', 
                    justifyContent: 'center',
                    background: 'linear-gradient(to left, rgb(215, 4, 102) 0%, rgb(189, 30, 89) 30%, rgb(146, 23, 77) 55%, rgb(134, 20, 83) 72.5%, rgb(108, 13, 99) 90%, rgb(108, 13, 99) 100%)', 
                    minHeight: '30vh',
                    borderRadius: '8px',
                    marginBottom: '4vh'
            }}>

                <button 
                id='add-image-button' 
                style={{marginTop: clicked ? '1vh' : '10vh'}}
                onClick={() => setClicked(clicked => !clicked)}>
                    Add an Image
                </button>

                {
                    clicked && type === 'spot' ? 

                    <div style={{display: 'flex', position: 'absolute', top: '22vh'}}>
                        <AddImageForm type='editSpot' spotId={typeId} />
                    </div>

                    : clicked && type === 'review' && 

                    <div style={{display: 'flex', position: 'absolute', top: '22vh'}}>
                        <AddImageForm type='editReview' reviewId={typeId.reviewId} />
                    </div>
                }

            </div>

            <p className='no-content'>Nothing to show here!</p>

        </div>
    );

    if (type === 'spot' && (spotImgs !== undefined && spotImgs.length && spotImgs.length > 0) || type ==='review' && (reviewImgs !== undefined && reviewImgs.length && reviewImgs.length > 0)) return (
        <div>
            <div 
            style={{
                    display: 'flex', 
                    justifyContent: 'center',
                    background: 'linear-gradient(to left, rgb(215, 4, 102) 0%, rgb(189, 30, 89) 30%, rgb(146, 23, 77) 55%, rgb(134, 20, 83) 72.5%, rgb(108, 13, 99) 90%, rgb(108, 13, 99) 100%)', 
                    minHeight: '30vh',
                    borderRadius: '8px',
                    marginBottom: '4vh'
                }}>
                    <button 
                        id='add-image-button' 
                        style={{marginTop: clicked ? '1vh' : '10vh'}}
                        onClick={() => setClicked(clicked => !clicked)}>
                            Add an Image
                    </button>

                    {
                        clicked && type === 'spot' ? 

                        <div style={{position: 'absolute', top: '22vh'}}>
                            <AddImageForm type='editSpot' spotId={typeId} />
                        </div>

                        : clicked && type === 'review' && 

                        <div style={{position: 'absolute', top: '22vh'}}>
                            <AddImageForm type='editReview' reviewId={typeId.reviewId} />
                        </div>
                    }
            </div>

            <div id='manage-spot-images-container'>

                {
                    type === 'spot' && spotImgs.length > 0 ?
                    spotImgs.map((img, i) => {
                        return (
                            <div
                            key={i}>
                                <img src={img.url} id='manage-spot-images'></img>
                                
                                
                                <button 
                                id='delete-image-button' 
                                onClick={() => {
                                    dispatch(deleteSpotImgData(typeId.spotId, i, spotImgs[i].id)) 
                                    }}>
                                        Delete
                                </button>
                                
                            </div>
                        )
                    }) 
                    : type === 'review' && reviewImgs.length > 0 ?
                    reviewImgs.map((img, i) => {
                        return (
                            <div key={i}>
                                <img src={img.url} id='manage-spot-images'></img>
                                
                                <button 
                                id='delete-image-button' 
                                onClick={() => {
                                    dispatch(deleteReviewImgData(typeId.reviewId, i, img.id)) 
                                }}>
                                    Delete
                                </button>
                            </div>
                        )
                    })
                    : <p className='no-content'>Nothing to show here!</p>
                }

            </div>
        </div>
    )
};

export default ManageImages;