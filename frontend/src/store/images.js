const initialState = {};

export const displayImgForm = (bool) => {
    return {
        type: 'DISPLAY_IMG_FORM',
        payload: bool
    };
};

const imagesReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'DISPLAY_IMG_FORM': {
            currentState['displayImgForm'] = action.payload;
    
            return currentState;
        };

        default: return currentState;
    };
};

export default imagesReducer;