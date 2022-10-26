import { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteSpotData } from '../../store/spotsReducer.js';

import './styles.css';

const ManageSpots = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [spotId, setSpotId] = useState(Number(0));

    useEffect(() => {
        const makeFetch = async () => {
          const fetchReq = await fetch(`/api/spots/current`);
          const fetchJSON = await fetchReq.json();
  
          setData([fetchJSON])
        };
  
        makeFetch();
    }, []);

    useEffect(() => {
        dispatch(deleteSpotData(spotId));
        history.push('/manage-listings')
    }, [spotId]);
    
    const allSpots = [];
    data.forEach(spot => spot.Spots.forEach((obj => allSpots.push(obj))));

    return (
        <div id='user-spots'>
            {allSpots.map((spot, i) => 
            <div className='user-spot-divs' key={i}>
                <p>{spot.description}</p>
                <NavLink to={`/spots/${spot.id}`} className='navlinks'>{spot.address}</NavLink>
                <br/>
                <button className='manage-buttons' id='delete-spot' onClick={() => setSpotId(spot.id)}>Delete</button>
                <button className='manage-buttons' id='edit-spot'>Edit</button>
            </div>)}
        </div>
    );
};

export default ManageSpots;