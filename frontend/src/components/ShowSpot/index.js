import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

import SpotImages from "./SpotImages.js";
import Reviews from "../Reviews/index.js";
import CreateBookingForm from "../Bookings/CreateBookingForm.js";

import { fetchSpotById } from "../../store/spots.js";

import './styles.css';

const ShowSpot = () => {
    const dispatch = useDispatch();
    const spotId = useParams();

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        dispatch(fetchSpotById(spotId.spotId));
    }, [dispatch]);

    const spotData = useSelector(state => state.spots.currSpot);
    const userData = useSelector(state => state.session.user);

    let spotOwner;
    let userId;
    if (spotData && spotData.Owner.id && userData && userData.id) {
        spotOwner = spotData.Owner.id;
        userId = userData.id;
    };

    let spotImages;
    if (spotData && spotData.SpotImages) spotImages = spotData.SpotImages;

    document.body.style.overflowY = 'scroll';

    if (!spotData) return <p className='no-content'>Loading...</p>
    if (spotData) return (
        <div style={{display: clicked && 'flex', justifyContent: 'center'}}>
        { 
            clicked === false ?
            <div>
                <div id='spot-images-container'>
                    <SpotImages imgArr={spotImages} />

                    <button id='all-photos-button' 
                    style={{visibility: spotImages.length < 6 && 'hidden'}}
                    onClick={() => setClicked(true)}>
                    Show All Photos
                    </button>
                </div>

                <div id='spot-list-container'>
                    <ul id='spot-list'>

                        <li>
                        Address: <b>{spotData.address}</b>
                        </li>

                        <li>
                        Average rating: <b>{spotData.avgRating}</b>
                        </li>

                        <li>
                        City: <b>{spotData.city}</b>
                        </li>

                        <li>
                        Country: <b>{spotData.country}</b>
                        </li>

                        <li>
                        State: <b>{spotData.state}</b>
                        </li>

                        <li>
                        Name: <b>{spotData.name}</b>
                        </li>

                        <li>
                        Description: <b>{spotData.description}</b>
                        </li>

                        <li>
                        Price: <b>{spotData.price}</b>
                        </li>

                    </ul>
                </div>

                {   
                    spotOwner && userId && spotOwner !== userId &&

                    <div 
                    id='bookings-component-holder'
                    style={{
                        position: 'fixed',
                        left: '78vw',
                        bottom: '2vh',
                        zIndex: '300'
                    }}>
                        <CreateBookingForm spotId={spotId.spotId} price={spotData.price} />
                    </div>
                }

                <div id={'reviews'}>
                    <Reviews spotId={spotId.spotId} avgRating={spotData.avgRating} type='spot' />
                </div>
            </div> 
            :
            <div 
            style={{display: 'flex', justifyContent: 'space-evenly', maxWidth: '80vw', flexWrap: 'wrap'}}>
                {spotImages.map((img, i) => <img src={img.url} className='view-all-spot-images' key={i}></img>)}

                <div style={{position: 'absolute'}}>
                    <button 
                        id="exit-all-photos-button"
                        onClick={() => setClicked(false)}>
                        Back
                    </button>
                </div>
            </div>
        }
    </div>
    );
};

export default ShowSpot;