import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './styles.css';

const ShowAllSpots = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const makeFetch = async () => {
          const fetchReq = await fetch(`/api/spots`);
          const fetchJSON = await fetchReq.json();
  
          setData([fetchJSON])
        };
  
        makeFetch();
    }, []);
    
    const allSpots = [];
    data.forEach(spot => spot.Spots.forEach((obj => allSpots.push(obj))));

    return (
        <div id='all-spots'>
            {allSpots.map((spot, i) => 
            <div className='spot-divs' key={i}>
                <p>{spot.description}</p>
                <NavLink to={`/spots/${spot.id}`} className='navlinks'>{spot.address}</NavLink>
            </div>)}
        </div>
    );
};

export default ShowAllSpots;