import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchSpots } from '../../store/spots.js';

import Spot from './Spot.js';

import './styles.css';

const ShowAllSpots = () => {
    const dispatch = useDispatch();

    const allSpots = useSelector(state => Object.values(state.spots));
    
    useEffect (() => {
        dispatch(fetchSpots());
    }, []);

    document.body.style.overflowY = 'scroll';

    return (
        <div id={allSpots.length && 'all-spots'}>
            {
                allSpots.length ? allSpots.map((spot, i) => <Spot id={spot.id} name={spot.name} city={spot.city} price={spot.price} previewImage={spot.previewImage} key={i} /> )
                :
                <p className='no-content'>No Results Found</p>
            }
        </div>
    );
};

export default ShowAllSpots;