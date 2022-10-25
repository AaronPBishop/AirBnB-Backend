import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './styles.css';

const ShowAllSpots = () => {
    const allSpots = useSelector(state => state.spots);

    const spotsArr = [];
    for (let key in allSpots) {
        const currSpot = allSpots[key];

        spotsArr.push(currSpot);
    };

    return (
        <div id='all-spots'>
            {spotsArr.map((spot, i) => 
            <div className='spot-divs' key={i}>
                {spot.description}
                <NavLink to={`/spots/${spot.id}`}>{spot.address}</NavLink>
            </div>)}
        </div>
    );
};

export default ShowAllSpots;