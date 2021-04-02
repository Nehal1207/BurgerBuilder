import * as actionTypes from '../actions/actionTypes';
const initialState = {
    token : null,
    userId: null,
    loading: false,
    authenticated: false,
    error : false
}
const reducer = (state = initialState, action) => {

    if (action.type === actionTypes.LOGOUT) {
        return {
            ...state,
            token: null,
            userId: null
        }
    }

    if (action.type === actionTypes.AUTH_FAILED) {
        return {
            ...state,
            error: true,
            loading :false
        }
    }

    if (action.type === actionTypes.AUTH_RESET) {
        return {
            ...state,
            authenticated: false
        }
    }

    if (action.type === actionTypes.AUTH_START) {
        return {
            ...state,
            loading: true,

        }
    }

    if (action.type === actionTypes.AUTH_SUCCESS) {
        return {
            ...state,
            loading: false,
            token: action.idToken,
            userId: action.localId,
            authenticated: true,
            error : false
        }
    }
    return state;
}

export default reducer;