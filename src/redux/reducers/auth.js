const initialState = {
    authLoading: false,
    user: null,
};

export const auth = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'SET_USER':
            return {
                ...state,
                user: payload,
            };
        case 'SET_AUTH_LOADING': 
            return {
                ...state,
                authLoading: payload,
            }
        default:
            return state;
    }
}