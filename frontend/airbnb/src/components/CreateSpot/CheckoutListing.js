import { useSelector } from 'react-redux';

import { useState } from "react";
import './styles.css';

const CheckoutListing = ({ previewImage, listingName, description, price, listingDetails}) => {
    const userName = useSelector(state => state.session.user.firstName);
    const [expandDetails, setExpandDetails] = useState(false);

    return (
        <div id='checkout-listing'>
            {   
                !expandDetails &&
                <div id='checkout-listing-card'>
                    <div id='checkout-listing-image'>
                        <img src={previewImage}></img>
                    </div>

                    <div id='checkout-listing-name' style={{borderBottom: '1px solid rgb(220, 220, 220)', marginLeft: '10px', marginRight: '10px'}}>
                        <p style={{fontFamily: 'Montserrat', fontWeight: 'bold'}}>{listingName} hosted by {userName}</p>
                    </div>

                    <div id='checkout-listing-description' style={{borderBottom: '1px solid rgb(220, 220, 220)', marginLeft: '10px', marginRight: '10px'}}>
                        <p style={{fontFamily: 'Montserrat', fontWeight: 'bold'}}>{description}</p>
                    </div>

                    <div id='checkout-listing-price' style={{borderBottom: '1px solid rgb(220, 220, 220)', marginLeft: '10px', marginRight: '10px'}}>
                        <p style={{fontFamily: 'Montserrat', fontWeight: 'bold'}}>${price} per night</p>
                    </div>

                    <div id='expand-details-button'>
                        <button onClick={() => setExpandDetails(true)}>More Details</button>
                    </div>
                </div>
            }

            {
                expandDetails &&
                <div id='checkout-listing-details'>
                    <ul id='review-spot-ul'>
                        <li>Address <i style={{position: 'fixed', fontWeight: '400'}}>: {listingDetails.address}</i></li>
                        <li>City <i style={{position: 'fixed', fontWeight: '400'}}>: {listingDetails.city}</i></li>
                        <li>State <i style={{position: 'fixed', fontWeight: '400'}}>: {listingDetails.state}</i></li>
                        <li>Country <i style={{position: 'fixed', fontWeight: '400'}}>: {listingDetails.country}</i></li>
                        <li>Lat <i style={{position: 'fixed', fontWeight: '400'}}>: {listingDetails.lat}</i></li>
                        <li>Lng <i style={{position: 'fixed', fontWeight: '400'}}>: {listingDetails.lng}</i></li>
                    </ul>
                </div>
            }
            
        </div>
    )
};

export default CheckoutListing;