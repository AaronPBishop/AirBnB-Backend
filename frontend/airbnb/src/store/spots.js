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

export const sendSpotData = (spot) => async (dispatch) => {
    await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    });

    dispatch(createSpotData(spot));
};

export const sendSpotImgData = (spotId, url, preview) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({url, preview})
    });

    const newImage = await response.json();

    dispatch(createSpotImage(newImage.id, url, preview));
};

export const deleteSpotImgData = (imgIndex, imgId) => async (dispatch) => {
    await csrfFetch(`/api/images/${imgId}`, {
        method: 'DELETE'
    });

    dispatch(deleteSpotImage(imgIndex));
};

const spotsReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'CREATE_SPOT_DATA': {
            currentState[action.payload.id] = action.payload;

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

        case 'CREATE_SPOT_IMAGE': {
            const spotImages = currentState.currSpot.SpotImages;
            currentState.currSpot.SpotImages[spotImages.length] = {id: action.payload1, url: action.payload2, preview: action.payload3};

            return currentState;
        };

        case 'DELETE_SPOT_IMAGE': {
            const spotImages = currentState.currSpot.SpotImages;
            delete spotImages[action.payload];

            return currentState;
        };

        case 'FEED_IMG_FORM_DATA': {
            currentState['imgFormData'] = {url: action.payload};

            return currentState;
        };

        default: return currentState;
    };
};

export default spotsReducer;