import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sendSpotData, fetchSpots, editSpotData } from '../../store/spots.js';

import CheckoutListing from './CheckoutListing.js';
import AddImageForm from '../ManageImages/AddImageForm.js';

import './styles.css';

const CreateSpot = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const spotId = useParams();
    
    const spotState = useSelector(state => state.spots);

    let spotAddresses;
    if (spotState && spotState.spotAddresses) spotAddresses = spotState.spotAddresses;

    const prompts = ['Let\'s give your place a name', 'How would you best describe your place?', 'Where\'s your place located?', 'Set your price', 'Now, let\'s give it a preview image (you can do this later)', 'Check out your listing!'];
    const buttonText = ['Next', 'Save your listing'];

    const [currPrompt, setCurrPrompt] = useState(Number(0));

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

        dispatch(fetchSpots());
    }, []);

    useEffect(() => {
        const errorMessages = {
            name: ['Name may only contain alphabetical characters', 'Enter a name between 2 and 49 characters long'],
            description: 'Description is required',
            address: ['Street address is required', 'Addresses must be unique. This address already exists.'],
            city: 'City is required',
            state: 'State is required',
            country: 'Country is required',
            lat: ['Latitude is required', 'Valid latitude value is required'],
            lng: ['Longitude is required', 'Valid longitude value is required'],
            price: ['Price is required', 'Price must be an integer or decimal (do not include commas)']
        };

        const errorsArr = [];

        // Name
        name.split('').forEach(letter => !letter.match(/[A-Za-z ]/) && !errorsArr.includes(errorMessages.name[0]) && currPrompt === 0 && errorsArr.push(errorMessages.name[0]));

        if (name.length < 2 && currPrompt === 0 || name.length > 49 && currPrompt === 0) if (!errorsArr.includes(errorMessages.name[1])) errorsArr.push(errorMessages.name[1]);

        // Description
        if (!description.length && currPrompt === 1) errorsArr.push(errorMessages.description);

        // Address
        const flattenedAddress = [];
        address.split('').map(char => char.match(/[A-Za-z0-9 ]/) && flattenedAddress.push(char.toLowerCase()));
        
        if (!address.length && currPrompt === 2) errorsArr.push(errorMessages.address[0]) 

        if (spotAddresses && spotAddresses.includes(flattenedAddress.join('')) && currPrompt === 2) errorsArr.push(errorMessages.address[1]);

        // City
        if (!city.length && currPrompt === 2) errorsArr.push(errorMessages.city);

        // State
        if (!state.length && currPrompt === 2) errorsArr.push(errorMessages.state);

        // Country
        if (!country.length && currPrompt === 2) errorsArr.push(errorMessages.country);

        // Lat & Lng

        (!lat && currPrompt === 2 && !errorsArr.includes(errorMessages.lat[0])) && errorsArr.push(errorMessages.lat[0]);
        (!lng && currPrompt === 2 && !errorsArr.includes(errorMessages.lng[0])) && errorsArr.push(errorMessages.lng[0]);

        (!(isFinite(lat) && Math.abs(lat) <= 90) && currPrompt === 2 && !errorsArr.includes(errorMessages.lat[1])) && errorsArr.push(errorMessages.lat[1]);
        (!(isFinite(lng) && Math.abs(lng) <= 180) && currPrompt === 2 && !errorsArr.includes(errorMessages.lng[1])) && errorsArr.push(errorMessages.lng[1]); 
        
        // Price
        if (!price.length && currPrompt === 3) errorsArr.push(errorMessages.price[0]);

        price.split('').forEach(char => !char.match(/[0-9.]/) && !errorsArr.includes(errorMessages.price[1]) && errorsArr.push(errorMessages.price[1]));

        setErrors(errorsArr);
    }, [currPrompt, name, description, address, city, state, country, lat, lng, price]);

    let url;
    if (spotState) {
        const imgFormData = spotState.imgFormData;

        if (imgFormData) url = imgFormData.url;
    };

    useEffect(() => {
        if (currPrompt > 5) setCurrPrompt(Number(0));
        if (currPrompt < 0) setCurrPrompt(Number(0));
    }, [currPrompt])

    const handleSubmit = () => {
        if (currPrompt < 5) {
            setCurrPrompt(Number(currPrompt) + 1);

            return;
        };

        if (spotId && spotId.spotId) {
            dispatch(editSpotData({id: spotId.spotId, address, city, state, country, lat, lng, name, description, price, previewImage: url}));
            history.push(`/`);
            
            return;
        };

        dispatch(sendSpotData({address, city, state, country, lat, lng, name, description, price, previewImage: url}));
        history.push(`/manage-listings`);
    };

    document.body.style.overflowY = 'hidden';

    return (
        <div id='create-spot'>

            <div id='spot-creation-prompts'>
                <p className='prompts' style={{
                    display: 'flex',
                    position: 'absolute',
                    inlineSize: '40vw',
                    top: '31vh',
                    left: currPrompt === 5 ? '8.8vw'
                    : currPrompt === 3 ? '14.8vw'
                    : '5.2vw'}}>
                    {prompts[currPrompt]}
                </p>
            </div>

            <div id='create-spot-forms'>
                {
                    errors.length > 0 && 
                    <div id='form-errors-container' style={{
                            display: 'flex',
                            justifyContent: 'center',
                            overflow: 'auto',
                            position: 'absolute',
                            bottom: '136vh',
                            right: currPrompt === 1 ? '35.7vw' : '34.9vw',
                            minWidth: '30vw',
                            maxWidth: '30vw',
                            textAlign: 'center',
                            lineHeight: '5vh',
                            minHeight: '90px',
                            maxHeight: '90px',
                            border: 'none',
                            borderRadius: '5px',
                            boxShadow: errors.length > 2 && '0px 2px 4px 0px rgb(65, 65, 65)'
                        }}>
                        <ul>
                            {errors.map((err, i) => <li style={{listStyle: 'none', fontWeight: '800', fontStyle: 'italic'}} key={i}>{err}</li>)}
                        </ul>
                    </div>
                }

                {

                    currPrompt === 0 && 

                    <label>
                         <input
                         className='create-spot-input'
                         type='text'
                         value={name}
                         onChange={e => setName(e.target.value)}
                         placeholder='Name'>
                         </input>
                     </label>

                    || currPrompt === 1 &&

                    <label>
                        <textarea
                        id='create-spot-description'
                        type='textarea'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='Description'>
                        </textarea>
                    </label>

                    || currPrompt === 2 &&
                
                    <form id='address-form'>
                        <label>
                            <input
                            className='create-spot-address-inputs'
                            type='text'
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            placeholder='Address'>
                            </input>
                        </label>

                        <label>
                            <input
                            className='create-spot-address-inputs'
                            type='text-area'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder='City'>
                            </input>
                        </label>

                        <label>
                            <input
                            className='create-spot-address-inputs'
                            type='text-area'
                            value={state}
                            onChange={e => setState(e.target.value)}
                            placeholder='State'>
                            </input>
                        </label>

                        <label>
                            <input
                            className='create-spot-address-inputs'
                            type='text-area'
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            placeholder='Country'>
                            </input>
                        </label>

                        <label>
                            <input
                            className='create-spot-address-inputs'
                            type='text-area'
                            value={lat}
                            onChange={e => setLat(e.target.value)}
                            placeholder='Lat'>
                            </input>
                        </label>

                        <label>
                            <input
                            className='create-spot-address-inputs'
                            type='text-area'
                            value={lng}
                            onChange={e => setLng(e.target.value)}
                            placeholder='Lng'>
                            </input>
                        </label>
                    </form>

                    || currPrompt === 3 && 

                    <label>
                        <p style={{
                            position: 'fixed',
                            fontSize: '35px',
                            fontWeight: 'bold',
                            bottom: '50.8vh',
                            right: '41.2vw'
                            }}>$</p>
                        <input
                        className='create-spot-input'
                        type='text-area'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        placeholder='Price per night'>
                        </input>
                    </label>

                    || currPrompt === 4 &&
                
                    <div id='create-spot-image-form'>
                        <AddImageForm type='createSpot' spotId={spotId.spotId} />
                    </div>

                    || currPrompt === 5 &&

                    <div id='checkout-listing-container'>
                        <CheckoutListing previewImage={url} listingName={name} description={description} price={price} listingDetails={{address, city, state, country, lat, lng}} />
                    </div>
                
                }

                <div id={
                    (currPrompt === 0 || currPrompt === 3) && 'form-navigation-1'
                    || (currPrompt === 1) && 'form-navigation-2'
                    || (currPrompt === 2) && 'form-navigation-3'
                    || (currPrompt === 4) && 'form-navigation-4'
                    || (currPrompt === 5) && 'form-navigation-5'
                }>
                    <button id='form-navigate-back-button' onClick={() => setCurrPrompt(Number(currPrompt) - 1)}>Back</button>
                    <button disabled={errors.length > 0}
                            id={currPrompt < 5 ? 
                                'form-navigation-button' :
                                'form-save-button'} 
                                type='submit' 
                                onClick={handleSubmit}>
                                {
                                currPrompt < 5 ?
                                buttonText[0] :
                                buttonText[1]
                                }
                    </button>
                </div>

            </div>

        </div>
    );
};

export default CreateSpot;