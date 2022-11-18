import { csrfFetch } from "./csrf";

const initialState = {};

export const createSpotData = (spot) => {
    return {
        type: 'CREATE_SPOT_DATA',
        payload: spot
    };
};

export const setCurrSpotId = (spotId) => {
    return {
        type: 'SET_CURR_SPOT_ID',
        payload: spotId
    };
};

export const setCurrSpot = (currSpot) => {
    return {
        type: 'SET_CURR_SPOT',
        payload: currSpot
    };
};

export const deleteSpot = (spotId) => {
    return {
        type: 'DELETE_SPOT',
        payload: spotId
    };
};

export const createSpotImage = (id, url, preview) => {
    return {
        type: 'CREATE_SPOT_IMAGE',
        payload1: id,
        payload2: url,
        payload3: preview
    }
};

export const deleteSpotImage = (imgIndex) => {
    return {
        type: 'DELETE_SPOT_IMAGE',
        payload: imgIndex
    };
};

export const feedImgFormData = (url) => {
    return {
        type: 'FEED_IMG_FORM_DATA',
        payload: url
    };
};

export const rerenderSpots = () => {
    return {
        type: 'RERENDER_SPOTS'
    };
};

export const setSpotsCity = (city) => {
    return {
        type: 'SET_CITY',
        payload: city
    };
};


export const fetchSpots = () => async (dispatch) => {
    const fetchReq = await csrfFetch(`/api/spots`, {
        method: 'GET'
    });

    const fetchJSON = await fetchReq.json();
    const data = [fetchJSON];
    
    data.forEach(spot => spot.Spots.forEach((obj => dispatch(createSpotData(obj)))));    
};

export const fetchSpotById = (spotId) => async (dispatch) => {
    const fetchReq = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'GET'
    });

    const fetchJSON = await fetchReq.json();
    const data = [fetchJSON];
    
    dispatch(setCurrSpot(data[0]));
};

export const fetchSpotByCity = (city) => async (dispatch) => {
    const fetchReq = await csrfFetch(`/api/spots/${city}/cities`, {
        method: 'GET'
    });
    
    const fetchJSON = await fetchReq.json();
    const data = [fetchJSON];
    
    data.forEach(spot => spot.forEach((obj => dispatch(createSpotData(obj)))));
};

export const fetchUserSpots = () => async (dispatch) => {
    const fetchReq = await csrfFetch(`/api/spots/current`, {
        method: 'GET'
    });
    const fetchJSON = await fetchReq.json();

    const data = [fetchJSON];
    data.forEach(spot => spot.Spots.forEach((obj => dispatch(createSpotData(obj)))));    
};

export const sendSpotData = (spot) => async (dispatch) => {
    await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    });

    dispatch(createSpotData(spot));
};

export const editSpotData = (spot) => async (dispatch) => {
    await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    });

    dispatch(createSpotData(spot));
};

export const sendSpotImgData = (spotId, url, preview) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({url, previewImage: preview})
    });

    const newImage = await response.json();

    dispatch(createSpotImage(newImage.id, url, preview));
};

export const deleteSpotImgData = (spotId, imgIndex, imgId) => async (dispatch) => {
    await csrfFetch(`/api/spots/${spotId}/images/${imgId}`, {
        method: 'DELETE'
    });

    dispatch(deleteSpotImage(imgIndex));
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
    await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    dispatch(deleteSpot(spotId));
};

const spotsReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'CREATE_SPOT_DATA': {
            currentState[action.payload.id] = action.payload;

            currentState['spotAddresses'] = [];
            const spotAddresses = currentState.spotAddresses;
            
            for (let key in currentState) {
                const currSpot = currentState[key];
                const currAddress = currSpot.address;
                
                let splitAddress;
                if (currAddress !== undefined) splitAddress = currAddress.split('');
                
                const flattenedAddress = [];
                if (splitAddress) splitAddress.map(char => char.match(/[A-Za-z0-9 ]/) && flattenedAddress.push(char.toLowerCase()));
                
                if (flattenedAddress.length) currentState.spotAddresses[spotAddresses.length] = flattenedAddress.join('');
            };

            return currentState;
        };

        case 'SET_CURR_SPOT_ID': {
            currentState['currSpotId'] = action.payload;

            return currentState;
        };

        case 'SET_CURR_SPOT': {
            currentState['currSpot'] = action.payload;

            return currentState;
        };

        case 'DELETE_SPOT': {
            delete currentState[action.payload];

            return currentState;
        };

        case 'CREATE_SPOT_IMAGE': {
            const spotId = currentState.currSpot.id;
            const spotImages = currentState.currSpot.SpotImages;

            if (currentState[spotId] && currentState[spotId].previewImage) if (action.payload3 === true) currentState[spotId].previewImage = action.payload2;
            currentState.currSpot.SpotImages[spotImages.length] = {id: action.payload1, url: action.payload2, preview: action.payload3};

            return currentState;
        };

        case 'DELETE_SPOT_IMAGE': {
            const spotId = currentState.currSpot.id;
            const spotImages = currentState.currSpot.SpotImages;

            if (currentState[spotId] && currentState[spotId].previewImage && currentState[spotId].previewImage === spotImages[action.payload].url) delete currentState[spotId].previewImage;
            if (currentState.currSpot.previewImage === spotImages[action.payload].url) delete currentState.currSpot.previewImage;
            delete spotImages[action.payload];

            return currentState;
        };

        case 'FEED_IMG_FORM_DATA': {
            currentState['imgFormData'] = {url: action.payload};

            return currentState;
        };

        case 'RERENDER_SPOTS': {
            let city;
            if (currentState.city) city = currentState.city;

            for (let key in currentState) if (key !== 'city') delete currentState[key];

            return currentState;
        };

        case 'SET_CITY': {
            currentState['city'] = action.payload;

            return currentState;
        };

        default: return currentState;
    };
};

export default spotsReducer;