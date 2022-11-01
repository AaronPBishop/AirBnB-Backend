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

    document.body.style.overflowY = 'scroll';

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

                <NavLink to={`/spots/${spot.id}`} className='navlinks' onClick={() => dispatch(setCurrSpotId(spot.id))}>
                    <p id='spot-details-name'>{spot.name}</p>
                </NavLink>

                <p className='spot-details'>{spot.city}</p>

                <p className='spot-details'><b>${spot.price}</b> night</p>
            </div>)}
        </div>
    );
};

export default ShowAllSpots;