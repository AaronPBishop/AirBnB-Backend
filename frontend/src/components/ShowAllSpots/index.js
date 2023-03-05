import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSpots } from '../../store/spots.js';

import Spot from './Spot.js';

import './styles.css';

const ShowAllSpots = () => {
    const dispatch = useDispatch();

    const allSpots = useSelector(state => Object.values(state.spots));

    document.body.style.overflowY = 'scroll';

    useEffect(() => {
        dispatch(fetchSpots());
    }, []);

    return (
        <div id={allSpots.length > 0 && 'all-spots'}>
            {
                allSpots.length > 0 ?
                allSpots.map((spot, i) => <Spot id={spot.id} name={spot.name} city={spot.city} price={spot.price} previewImage={spot.previewImage} key={i} /> )
                : <p className='no-content'>No Results Found</p>
            }
        </div>
    );
};

export default ShowAllSpots;