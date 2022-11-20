import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchUserSpots, deleteSpotThunk, setCurrSpotId, rerenderSpots } from '../../store/spots.js';

import './styles.css';

const ManageSpots = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(rerenderSpots());
        
        dispatch(fetchUserSpots());
    }, [dispatch]);
    
    const session = useSelector(state => state.session);
    const spots = useSelector(state => state.spots);

    let userId;
    const userSpots = [];
    if (spots && session && session.user && session.user.id) {
        userId = session.user.id;

        for (let key in spots) {
            if (spots[key].ownerId === userId) userSpots.push(spots[key]);
        };
    };

    document.body.style.overflowY = 'scroll';

    if (userSpots.length < 1) return (<p className='no-content'>Nothing to show here!</p>)
    if (userSpots.length > 0) return (
        <div id='user-spots'>

            {userSpots.map((spot, i) => 
            <div className='user-spot-divs' key={i}>
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

                <div id='manage-spot-details'>
                    <NavLink to={`/spots/${spot.id}`} className='navlinks' onClick={() => dispatch(setCurrSpotId(spot.id))}>
                        <p style={{fontWeight: 'bold', color: 'black'}} id='spot-details-name'>{spot.name}</p>
                    </NavLink>
                    <p>{spot.city}</p>
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