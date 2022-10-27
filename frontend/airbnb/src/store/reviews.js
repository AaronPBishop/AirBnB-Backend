import { csrfFetch } from "./csrf";

const initialState = {};

export const createReview = (review) => {
    return {
        type: 'CREATE_REVIEW',
        payload: review
    };
};

export const fetchSpotReviews = (spotId) => async (dispatch) => {
    const fetchReq = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'GET'
    });

    const fetchJSON = await fetchReq.json();
    const data = [fetchJSON];
    
    data.forEach(review => review.Reviews.forEach((obj => dispatch(createReview(obj)))));    
};

const reviewsReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'CREATE_REVIEW': {
            currentState[action.payload.id] = action.payload;

            return currentState;
        };

        default: return currentState;
    };
};

export default reviewsReducer;