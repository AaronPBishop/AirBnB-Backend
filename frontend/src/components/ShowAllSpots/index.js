import Spot from './Spot.js';

import './styles.css';

const ShowAllSpots = ({ spots, totalSpots }) => {
    document.body.style.overflowY = 'scroll';

    return (
        <div id={totalSpots > 0 && 'all-spots'}>
            {
                totalSpots > 0 ? spots.map((spot, i) => <Spot id={spot.id} name={spot.name} city={spot.city} price={spot.price} previewImage={spot.previewImage} key={i} /> )
                :
                <p className='no-content'>No Results Found</p>
            }
        </div>
    );
};

export default ShowAllSpots;