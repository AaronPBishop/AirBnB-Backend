import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './styles.css';

const ShowSpot = () => {
    const spotId = useParams();
    const allSpots = useSelector(state => state.spots);
    const spotData = allSpots[spotId.spotId];

    return (
        <div id='show-spot'>
            <ul id='spot-list'>
                <li>
                Address: {spotData.address}
                </li>
                
                <li>
                Average rating: {spotData.avgRating}
                </li>
                
                <li>
                City: {spotData.city}
                </li>

                <li>
                Country: {spotData.country}
                </li>

                <li>
                State: {spotData.state}
                </li>

                <li>
                Name: {spotData.name}
                </li>

                <li>
                Price: {spotData.price}
                </li>

            </ul>
        </div>
    );
};

export default ShowSpot;