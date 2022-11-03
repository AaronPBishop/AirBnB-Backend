import { csrfFetch } from "./csrf";

const initialState = {};

export const createReview = (review, reviewId) => {
    return {
        type: 'CREATE_REVIEW',
        payload: review,
        payload2: reviewId
    };
};

export const toggleEditMode = (boolean, reviewId) => {
    return {
        type: 'EDIT_REVIEW',
        payload1: boolean,
        payload2: reviewId
    };
};

export const addTempReviewImg = (url, preview) => {
    return {
        type: 'ADD_TEMP_REVIEW_IMG',
        payload1: url,
        payload2: preview
    };
};

export const addReviewImages = (id, url, preview, reviewId) => {
    return {
        type: 'ADD_REVIEW_IMAGES',
        payload1: id,
        payload2: url,
        payload3: preview,
        payload4: reviewId
    };
};

export const deleteReview = (reviewId) => {
    return {
        type: 'DELETE_REVIEW',
        payload: reviewId
    };
};

export const deleteReviewImg = (reviewId, imgIndex) => {
    return {
        type: 'DELETE_REVIEW_IMG',
        payload1: reviewId,
        payload2: imgIndex
    };
};

export const submittedReview = (boolean) => {
    return {
        type: 'SUBMITTED_REVIEW',
        payload: boolean
    };
};

export const rerenderReviews = () => {
    return {
        type: 'RERENDER_REVIEWS'
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

export const fetchUserReviews = () => async (dispatch) => {
    const fetchReq = await csrfFetch(`/api/reviews/current`, {
        method: 'GET'
    });

    const fetchJSON = await fetchReq.json();
    const data = [fetchJSON];
    
    data.forEach(review => review.Reviews.forEach((obj => dispatch(createReview(obj)))));    
};

export const createSpotReview = (review, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    });

    const newReview = response.json();
    dispatch(createReview(review, newReview.id));

    return newReview;
};

export const editSpotReview = (review, reviewId) => async (dispatch) => {
    await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    });
    
    dispatch(createReview(review));
};

export const createReviewImage = (url, preview, reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}/images`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({url, preview})
    });

    const newReview = await response.json();

    dispatch(createReview(newReview));
};

export const addMoreReviewImages = (url, preview, reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}/images`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({url, preview})
    });

    const newImage = await response.json();

    dispatch(addReviewImages(newImage.id, url, preview, reviewId));
};

export const deleteReviewData = (reviewId) => async (dispatch) => {
    await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    
    dispatch(deleteReview(reviewId));
};

export const deleteReviewImgData = (reviewId, imgIndex, imageId) => async (dispatch) => {
    await csrfFetch(`/api/images/${imageId}`, {
        method: 'DELETE'
    });
    
    dispatch(deleteReviewImg(reviewId, imgIndex));
};

const reviewsReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'CREATE_REVIEW': {
            if (!action.payload2) currentState[action.payload.id] = action.payload
            else currentState[action.payload2] = action.payload;
            
            return currentState;
        };

        case 'EDIT_REVIEW': {
            currentState['editMode'] = {boolean: action.payload1, reviewId: action.payload2};
            // currentState[action.payload2]

            return currentState;
        };


        case 'ADD_TEMP_REVIEW_IMG': {
            const ReviewImages = {url: action.payload1, preview: action.payload2};

            currentState['CurrentReviewImgs'] = ReviewImages;

            return currentState;
        };

        case 'ADD_REVIEW_IMAGES': {
            const reviewImages = currentState[action.payload4].ReviewImages;
            currentState[action.payload4].ReviewImages[reviewImages.length] = {id: action.payload1, url: action.payload2, preview: action.payload3};

            return currentState;
        };

        case 'DELETE_REVIEW': {
            delete currentState[action.payload];

            return currentState;
        };

        case 'DELETE_REVIEW_IMG': {
            delete currentState[action.payload1].ReviewImages[action.payload2];

            return currentState;
        };

        case 'SUBMITTED_REVIEW': {
            if (currentState['editMode']) delete currentState['editMode'];
            if (currentState['CurrentReviewImgs']) delete currentState['CurrentReviewImgs'];
            if (currentState['undefined']) delete currentState['undefined'];
            
            currentState['submitted'] = action.payload;

            return currentState;
        };

        case 'RERENDER_REVIEWS': {
            return initialState;
        };

        default: return currentState;
    };
};

export default reviewsReducer;