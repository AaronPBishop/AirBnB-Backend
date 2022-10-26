import { useHistory } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSpotData, sendSpotData } from '../../store/spotsReducer.js';
import './styles.css';

const CreateSpot = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { address, city, state, country, lat, lng, name, description, price } = useSelector(state => state.spots);
    const currSpot = useSelector(state => state.spots);

    const prompts = ['Let\'s give your place a name', 'How would you best describe your place?', 'Where\'s your place located?', 'Now, set your price', 'Check out your listing!'];
    const buttonText = ['Next', 'Save your listing'];
    const [currPrompt, setCurrPrompt] = useState(Number(0));

    useEffect(() => {
        if (currPrompt > 4) setCurrPrompt(Number(0));
        if (currPrompt < 0) setCurrPrompt(Number(0));
    }, [currPrompt])

    const handleSubmit = () => {
        if (currPrompt < 4) {
            setCurrPrompt(Number(currPrompt) + 1);
            return;
        };

        history.push(`/`);
        dispatch(sendSpotData(currSpot));
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
                    onChange={e => dispatch((createSpotData('name', e.target.value)))}>
                    </input>
                </label>

                || currPrompt === 1 &&

                <label>
                    <input
                    className='create-spot-input'
                    type='text-area'
                    value={description}
                    onChange={e => dispatch((createSpotData('description', e.target.value)))}>
                    </input>
                </label>

                || currPrompt === 2 &&

                <form id='address-form'>
                    <label>
                        <input
                        className='create-spot-input'
                        type='text-area'
                        value={address}
                        onChange={e => dispatch((createSpotData('address', e.target.value)))}
                        placeholder='Address'>
                        </input>
                    </label>

                    <label>
                        <input
                        className='create-spot-input'
                        type='text-area'
                        value={city}
                        onChange={e => dispatch((createSpotData('city', e.target.value)))}
                        placeholder='City'>
                        </input>
                    </label>

                    <label>
                        <input
                        className='create-spot-input'
                        type='text-area'
                        value={state}
                        onChange={e => dispatch((createSpotData('state', e.target.value)))}
                        placeholder='State'>
                        </input>
                    </label>

                    <label>
                        <input
                        className='create-spot-input'
                        type='text-area'
                        value={country}
                        onChange={e => dispatch((createSpotData('country', e.target.value)))}
                        placeholder='Country'>
                        </input>
                    </label>

                    <label>
                        <input
                        className='create-spot-input'
                        type='text-area'
                        value={lat}
                        onChange={e => dispatch((createSpotData('lat', e.target.value)))}
                        placeholder='Lat'>
                        </input>
                    </label>

                    <label>
                        <input
                        className='create-spot-input'
                        type='text-area'
                        value={lng}
                        onChange={e => dispatch((createSpotData('lng', e.target.value)))}
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
                    onChange={e => dispatch((createSpotData('price', e.target.value)))}>
                    </input>
                </label>

                || currPrompt === 4 &&
                
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

                <div id='form-navigation'>
                    <button id='form-navigate-back-button' onClick={() => setCurrPrompt(Number(currPrompt) - 1)}>Back</button>
                    <button id={currPrompt < 4 ? 
                                'form-navigation-button' :
                                'form-save-button'} 
                                type='submit' 
                                onClick={handleSubmit}>
                                {
                                currPrompt < 4 ?
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