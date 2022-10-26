import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './styles.css';

const ShowSpot = () => {
    const spotId = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const makeFetch = async () => {
          const fetchReq = await fetch(`/api/spots/${spotId.spotId}`);
          const fetchJSON = await fetchReq.json();
  
          setData(fetchJSON)
        };
  
        makeFetch();
    }, []);

    return (
        <div id='show-spot'>
            <ul id='spot-list'>
                <li>
                Address: {data.address}
                </li>
                
                <li>
                Average rating: {data.avgRating}
                </li>
                
                <li>
                City: {data.city}
                </li>

                <li>
                Country: {data.country}
                </li>

                <li>
                State: {data.state}
                </li>

                <li>
                Name: {data.name}
                </li>

                <li>
                Price: {data.price}
                </li>

            </ul>
        </div>
    );
};

export default ShowSpot;