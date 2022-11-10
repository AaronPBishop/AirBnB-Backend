import { csrfFetch } from "./csrf";

const initialState = {};

export const createBooking = (spotId, startDate, endDate) => {
    return {
        type: 'CREATE_BOOKING',
        payload1: spotId,
        payload2: startDate,
        payload3: endDate
    };
};

export const sendBookingData = (spotId, bookingData) => async (dispatch) => {
    await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(bookingData)
    });

    const { startDate, endDate } = bookingData;

    dispatch(createBooking(spotId, startDate, endDate));
};

const bookingsReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'CREATE_BOOKING': {
            currentState[action.payload1] = {startDate: action.payload2, endDate: action.payload3}

            return currentState;
        };

        default: return currentState;
    };
};

export default bookingsReducer;