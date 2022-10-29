import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sendSpotData } from '../../store/spots.js';
import { editSpotData } from '../../store/userSpots.js';

import './styles.css';
import AddImageForm from '../ManageImages/AddImageForm.js';

const CreateSpot = ({ id }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const prompts = ['Let\'s give your place a name', 'How would you best describe your place?', 'Where\'s your place located?', 'Set your price', 'Now, let\'s give it a preview image', 'Check out your listing!'];
    const buttonText = ['Next', 'Save your listing'];

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const spotState = useSelector(state => state.spots);

    let url;
    if (spotState) {
        const imgFormData = spotState.imgFormData;

        if (imgFormData) url = imgFormData.url;
    };

    const [currPrompt, setCurrPrompt] = useState(Number(0));

    useEffect(() => {
        if (currPrompt > 5) setCurrPrompt(Number(0));
        if (currPrompt < 0) setCurrPrompt(Number(0));
    }, [currPrompt])

    const handleSubmit = () => {
        if (currPrompt < 5) {
            setCurrPrompt(Number(currPrompt) + 1);

            return;
        };

        if (id) {
            dispatch(editSpotData({id: id, address, city, state, country, lat, lng, name, description, price, previewImage: url}));
            history.push(`/`);
            
            return;
        };

        dispatch(sendSpotData({address, city, state, country, lat, lng, name, description, price, previewImage: url}));
        history.push(`/`);
    };

    return (
        <div id='create-spot'>

            <div id='spot-creation-prompts'>
                <p className='prompts'>{prompts[currPrompt]}</p>
            </div>

            <div id='create-spot-forms'>

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
                        className='create-spot-input'
                        type='text'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder='Address'>
                        </input>
                    </label>

                    <label>
                        <input
                        className='create-spot-input'
                        type='text-area'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder='City'>
                        </input>
                    </label>

                    <label>
                        <input
                        className='create-spot-input'
                        type='text-area'
                        value={state}
                        onChange={e => setState(e.target.value)}
                        placeholder='State'>
                        </input>
                    </label>

                    <label>
                        <input
                        className='create-spot-input'
                        type='text-area'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        placeholder='Country'>
                        </input>
                    </label>

                    <label>
                        <input
                        className='create-spot-input'
                        type='text-area'
                        value={lat}
                        onChange={e => setLat(e.target.value)}
                        placeholder='Lat'>
                        </input>
                    </label>

                    <label>
                        <input
                        className='create-spot-input'
                        type='text-area'
                        value={lng}
                        onChange={e => setLng(e.target.value)}
                        placeholder='Lng'>
                        </input>
                    </label>
                </form>

                || currPrompt === 3 && 

                <label>
                    <input
                    className='create-spot-input'
                    type='text-area'
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder='$'>
                    </input>
                </label>

                || currPrompt === 4 &&
                
                <div id='create-spot-image-form'>
                    <AddImageForm type='createSpot' spotId={id} />
                </div>

                || currPrompt === 5 &&

                <div id='review-spot'>
                    <ul id='review-spot-ul'>
                        <li>Address: {address}</li>
                        <li>City: {city}</li>
                        <li>State: {state}</li>
                        <li>Country: {country}</li>
                        <li>Lat: {lat}</li>
                        <li>Lng: {lng}</li>
                        <li>Name: {name}</li>
                        <li>Price: {price}</li>
                        <li>Description: {description}</li>
                    </ul>
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
                    <button id={currPrompt < 5 ? 
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