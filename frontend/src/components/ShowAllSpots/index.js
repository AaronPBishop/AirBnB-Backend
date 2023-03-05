import { useSelector } from "react-redux";

import Spot from './Spot.js';

import './styles.css';

const ShowAllSpots = ({ spots }) => {
    const searchResults = useSelector(state => state.spots.searchResults);

    document.body.style.overflowY = 'scroll';

    return (
        <div id={'all-spots'}>
            {
                searchResults && searchResults.length > 0 ?
                searchResults.map((spot, i) => <Spot id={spot.id} name={spot.name} city={spot.city} price={spot.price} previewImage={spot.previewImage} key={i} /> )
                :
                spots.map((spot, i) => <Spot id={spot.id} name={spot.name} city={spot.city} price={spot.price} previewImage={spot.previewImage} key={i} /> )
            }
        </div>
    );
};

export default ShowAllSpots;