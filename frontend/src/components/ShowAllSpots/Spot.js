import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { setCurrSpotId } from '../../store/spots.js';

const Spot = ({ id, name, city, price, previewImage }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <div className='spot-divs'>
            <div id='preview-image-container'>
                {
                    previewImage !== null ? 
                    <img 
                    id='preview-image'
                    src={previewImage} 
                    onClick={() => {
                        dispatch(setCurrSpotId(id));
                        history.push(`/spots/${id}`);
                    }}
                    style={{cursor: 'pointer'}}>
                    </img> 
                    : 
                    <p><i>No Image</i></p>
                }
            </div>
            
            <NavLink to={`/spots/${id}`} className='navlinks' onClick={() => dispatch(setCurrSpotId(id))}>
                <p style={{fontWeight: 'bold', color: 'black'}} id='spot-details-name'>{name}</p>
            </NavLink>
            
            <p className='spot-details'>{city}</p>
            
            <p className='spot-details'><b>${price}</b> night</p>
        </div>
    );
};

export default Spot;