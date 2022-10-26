import { csrfFetch } from "./csrf";

const initialState = {
    address: '',
    city: '',
    state: '',
    country: '',
    lat: '',
    lng: '',
    name: '',
    description: '',
    price: ''
};

export const createSpotData = (fieldName, info) => {
    return {
        type: 'CREATE_SPOT_DATA',
        payload1: fieldName,
        payload2: info
    };
};

export const setSpotData = (data) => {
    return {
        type: 'SET_SPOT_DATA',
        payload: data
    };
};

export const setSpotId = (id) => {
    return {
        type: 'SET_SPOT_ID',
        payload: id
    };
};

export const sendSpotData = (data) => async (dispatch) => {
    await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    dispatch(setSpotData(data));
};

export const deleteSpotData = (id) => async (dispatch) => {
    await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    });
};

const spotsReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'CREATE_SPOT_DATA': {
            currentState[action.payload1] = action.payload2;

            return currentState;
        };

        case 'SET_SPOT_DATA': {
            return initialState;
        };

        default: return currentState;
    };
};

export default spotsReducer;