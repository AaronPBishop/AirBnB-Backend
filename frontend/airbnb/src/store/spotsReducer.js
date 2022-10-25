import { csrfFetch } from "./csrf";

const initialState = {};

export const createSpot = (spot) => {
    return {
        type: 'CREATE_SPOT',
        payload: spot
    };
};

export const seedInitialState = () => async (dispatch) => {
    const fetchReq = await csrfFetch(`/api/spots`);
    const fetchJSON = await fetchReq.json();

    return fetchJSON;
};

const spotsReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'CREATE_SPOT': {
            currentState[action.payload.id] = action.payload;

            return currentState;
        };

        default: return currentState;
    };
};

export default spotsReducer;