import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchSpots, rerenderSpots, setCurrSpotId } from '../../store/spots.js';

import './styles.css';

const ShowAllSpots = ({ type }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const allSpots = useSelector(state => state.spots);
    
    useEffect (() => {
        if (type === 'show-all') {
            dispatch(rerenderSpots());
            dispatch(fetchSpots());
        };
    }, [dispatch]);

    document.body.style.overflowY = 'scroll';

    if (!allSpots.spots) return <p className='no-content'>Loading...</p>
    if (allSpots.spots) return (
        <div id={allSpots.spots.length > 0 && 'all-spots'}>
            {
                allSpots.spots.length < 1 ? <p className='no-content'>No Results Found</p>
                : allSpots.spots.length > 0 && allSpots.spots.map((spot, i) => (
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
            }
        </div>
    );
};

export default ShowAllSpots;