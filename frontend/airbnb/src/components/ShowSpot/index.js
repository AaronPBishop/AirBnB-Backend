import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from 'react';

import { fetchSpotById } from "../../store/spots.js";
import Reviews from "../Reviews/index.js";

import './styles.css';

const ShowSpot = () => {
    const dispatch = useDispatch();
    const spotId = useParams();

    useEffect(() => {
        dispatch(fetchSpotById(spotId.spotId))
    }, [dispatch]);

    const spotData = useSelector(state => state.spots.currSpot);

    if (spotData) return (
        <div>
            <div id='spot-images-container'>
                {
                    spotData.SpotImages.length > 0 ?
                    spotData.SpotImages.map((img, i) => <img src={img.url} key={i} id='spot-images'></img>) 
                    : <p><i>No images to display</i></p>
                }
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
                    Price: <b>{spotData.price}</b>
                    </li>

                </ul>
            </div>

            <div id='reviews'>
                <Reviews spotId={spotId.spotId} avgRating={spotData.avgRating} />
            </div>
        </div>
    );
};

export default ShowSpot;