import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchUserSpots, deleteSpotThunk } from '../../store/userSpots.js';
import { setCurrSpotId } from '../../store/spots.js';

import './styles.css';

const ManageSpots = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserSpots());
    }, [dispatch]);
    
    const userSpots = useSelector(state => state.userSpots);

    const spotsArr = [];
    if (userSpots) for (let key in userSpots) {
        const currSpot = userSpots[key];

        spotsArr.push(currSpot);
    };

    document.body.style.overflowY = 'scroll';

    if (!spotsArr.length) return (<p className='no-content'>...Nothing to show here!</p>)
    return (
        <div id='user-spots'>

            {spotsArr.map((spot, i) => 
            <div className='user-spot-divs' key={i}>
                <div id='preview-image-container'>
                    {
                        spot.previewImage !== null ? 
                        <img src={spot.previewImage} id='preview-image'></img> : 
                        <p><i>No Image</i></p>
                    }
                </div>

                <div id='manage-spot-details'>
                    <p id='spot-name'><b>{spot.name}</b></p>
                    <NavLink to={`/spots/${spot.id}`} className='navlinks'>{spot.city}</NavLink>
                </div>

                <div id='manage-buttons-container'>
                    <button className='manage-buttons' id='delete-spot' onClick={() => dispatch(deleteSpotThunk(spot.id))}>Delete</button>

                    <button className='manage-buttons' id='edit-spot' onClick={() => {
                        dispatch(setCurrSpotId(spot.id));
                        history.push(`/edit-spot/${spot.id}`);
                    }}>Edit</button>

                    <button className='manage-buttons' id='manage-photos' onClick={() => history.push(`/manage-photos/spots/${spot.id}`)}>Manage Photos</button>
                </div>

            </div>)}

        </div>
    );
};

export default ManageSpots;