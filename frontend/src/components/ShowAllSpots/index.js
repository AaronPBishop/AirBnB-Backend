import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchSpots, setCurrSpotId } from '../../store/spots.js';

import './styles.css';

const ShowAllSpots = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const allSpots = useSelector(state => state.spots.spots);

    const [randKey, setRandKey] = useState(null);
    
    useEffect (() => {
        dispatch(fetchSpots());
    }, []);

    useEffect(() => {
        if (allSpots.length) {
            const randNum = Math.floor(Math.random() * 999999999999999);
            setRandKey(randNum);
        };
    }, [allSpots]);

    document.body.style.overflowY = 'scroll';

    if (!allSpots) return <p className='no-content'>Loading...</p>
    return (
        <div id={allSpots.length && 'all-spots'} key={randKey} >
            {
                allSpots.length ? allSpots.map((spot, i) => (
                    <div className='spot-divs' key={i}>
                        <div id='preview-image-container'>
                            {
                                spot.previewImage !== null ? 
                                <img 
                                id='preview-image'
                                src={spot.previewImage} 
                                onClick={() => {
                                    dispatch(setCurrSpotId(spot.id));
                                    history.push(`/spots/${spot.id}`);
                                }}
                                style={{cursor: 'pointer'}}>
                                </img> 
                                : 
                                <p><i>No Image</i></p>
                            }
                        </div>
                        
                        <NavLink to={`/spots/${spot.id}`} className='navlinks' onClick={() => dispatch(setCurrSpotId(spot.id))}>
                            <p style={{fontWeight: 'bold', color: 'black'}} id='spot-details-name'>{spot.name}</p>
                        </NavLink>
                        
                        <p className='spot-details'>{spot.city}</p>
                        
                        <p className='spot-details'><b>${spot.price}</b> night</p>
                    </div>
                ))
                :
                <p className='no-content'>No Results Found</p>
            }
        </div>
    );
};

export default ShowAllSpots;