import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchSpots, setCurrSpotId } from '../../store/spots.js';

import './styles.css';

const ShowAllSpots = () => {
    const dispatch = useDispatch();
    
    useEffect (() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    const allSpots = useSelector(state => state.spots);
    
    const spotsArr = [];
    for (let key in allSpots) {
        const currSpot = allSpots[key];

        if (key.match(/[0-9]/)) spotsArr.push(currSpot);
    };

    return (
        <div id='all-spots'>
            {spotsArr.map((spot, i) => 
            <div className='spot-divs' key={i}>

                <div id='preview-image-container'>
                    {
                        spot.previewImage !== null ? 
                        <img src={spot.previewImage} id='preview-image'></img> : 
                        <p><i>No Image</i></p>
                    }
                </div>

                <p id='spot-name'><b>{spot.name}</b></p>

                <NavLink to={`/spots/${spot.id}`} className='navlinks' onClick={() => dispatch(setCurrSpotId(spot.id))}>{spot.city}</NavLink>

                <p><b>${spot.price}</b> night</p>
            </div>)}
        </div>
    );
};

export default ShowAllSpots;