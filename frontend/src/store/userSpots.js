// import { csrfFetch } from "./csrf";
// import { deleteSpot } from "./spots";

// const initialState = {};

// export const seedUserSpots = (spot) => {
//     return {
//         type: 'SEED_USER_SPOTS',
//         payload: spot
//     };
// };

// export const deleteUserSpot = (spotId) => {
//     return {
//         type: 'DELETE_USER_SPOT',
//         payload: spotId
//     };
// };

// export const fetchUserSpots = () => async (dispatch) => {
//     const fetchReq = await csrfFetch(`/api/spots/current`, {
//         method: 'GET'
//     });
//     const fetchJSON = await fetchReq.json();

//     const data = [fetchJSON];
//     data.forEach(spot => spot.Spots.forEach((obj => dispatch(seedUserSpots(obj)))));    
// };

// export const deleteSpotThunk = (spotId) => async (dispatch) => {
//     await csrfFetch(`/api/spots/${spotId}`, {
//         method: 'DELETE'
//     });

//     dispatch(deleteUserSpot(spotId));
//     dispatch(deleteSpot(spotId));
// };

// export const editSpotData = (spot) => async (dispatch) => {
//     await csrfFetch(`/api/spots/${spot.id}`, {
//         method: 'PUT',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(spot)
//     });

//     dispatch(seedUserSpots(spot));
// };

// const userSpotsReducer = (state = initialState, action) => {
//     const currentState = { ...state };

//     switch (action.type) {
//         case 'SEED_USER_SPOTS': {
//             currentState[action.payload.id] = action.payload;

//             return currentState;
//         };

//         case 'DELETE_USER_SPOT': {
//             delete currentState[action.payload];

//             return currentState;
//         };

//         default: return currentState;
//     };
// };

// export default userSpotsReducer;