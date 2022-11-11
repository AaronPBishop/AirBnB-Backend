import { csrfFetch } from "./csrf";

const initialState = {};

export const createBooking = (bookingId, startDate, endDate) => {
    return {
        type: 'CREATE_BOOKING',
        payload1: bookingId,
        payload2: startDate,
        payload3: endDate
    };
};

export const rerenderBookings = () => {
    return {
        type: 'RERENDER_BOOKINGS'
    };
};

export const getSpotBookingData = (spotId) => async (dispatch) => {
    const fetchReq = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'GET'
    });

    const res = await fetchReq.json();
    const bookingsData = res.Bookings;

    bookingsData.forEach(booking => {
        const startDateObj = new Date(booking.startDate);
        const startYear = startDateObj.getUTCFullYear();
        const startMonth = startDateObj.getMonth() + 1;
        const startDay = startDateObj.getUTCDate();
        const startDate = startYear + "-" + startMonth + "-" + startDay;

        const endDateObj = new Date(booking.endDate);
        const endYear = endDateObj.getUTCFullYear();
        const endMonth = endDateObj.getMonth() + 1;
        const endDay = endDateObj.getUTCDate();
        const endDate = endYear + "-" + endMonth + "-" + endDay;

        dispatch(createBooking(booking.id, startDate, endDate));
    });
};

export const sendBookingData = (spotId, bookingData) => async (dispatch) => {
    const fetchReq = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(bookingData)
    });

    const res = await fetchReq.json();

    const { startDate, endDate } = bookingData;

    dispatch(createBooking(res.id, startDate, endDate));
};

const bookingsReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'CREATE_BOOKING': {
            currentState[action.payload1] = {startDate: action.payload2, endDate: action.payload3}

            return currentState;
        };

        case 'RERENDER_BOOKINGS': return initialState;

        default: return currentState;
    };
};

export default bookingsReducer;