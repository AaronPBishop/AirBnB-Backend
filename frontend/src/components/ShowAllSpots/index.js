import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchSpots, rerenderSpots, setCurrSpotId, fetchSpotByCity } from '../../store/spots.js';

import './styles.css';

const ShowAllSpots = ({ type }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const allSpots = useSelector(state => state.spots);
    
    useEffect (() => {
        if (type === 'city') return;

        if (type === 'show-all') {
            dispatch(rerenderSpots());
            dispatch(fetchSpots());
        };
    }, []);
    
    const spotsArr = [];
    for (let key in allSpots) {
        const currSpot = allSpots[key];

        if (key.match(/[0-9]/)) spotsArr.push(currSpot);
    };

    document.body.style.overflowY = 'scroll';

    if (!spotsArr.length) return <p className='no-content'>No results found</p>
    if (spotsArr.length) return (
        <div id='all-spots'>
            {spotsArr.map((spot, i) => 
            <div className='spot-divs' key={i}>

                <div id='preview-image-container'>
                    {
                        spot.previewImage !== null ? 
                        <img 
                        src={spot.previewImage} 
                        onClick={() => {
                            dispatch(setCurrSpotId(spot.id));
                            history.push(`/spots/${spot.id}`);
                        }}
                        style={{cursor: 'pointer'}}
                        id='preview-image'></img> : 
                        <p><i>No Image</i></p>
                    }
                </div>

                <NavLink to={`/spots/${spot.id}`} className='navlinks' onClick={() => dispatch(setCurrSpotId(spot.id))}>
                    <p style={{fontWeight: 'bold', color: 'black'}} id='spot-details-name'>{spot.name}</p>
                </NavLink>

                <p className='spot-details'>{spot.city}</p>

                <p className='spot-details'><b>${spot.price}</b> night</p>
            </div>)}
        </div>
    );
};

export default ShowAllSpots;