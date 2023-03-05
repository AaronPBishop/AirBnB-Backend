import Spot from './Spot.js';

import './styles.css';

const ShowAllSpots = ({ spots }) => {
    document.body.style.overflowY = 'scroll';

    return (
        <div id={'all-spots'}>
            {
                spots.map((spot, i) => <Spot id={spot.id} name={spot.name} city={spot.city} price={spot.price} previewImage={spot.previewImage} key={i} /> )
            }
        </div>
    );
};

export default ShowAllSpots;