import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        localId : id
    }
}


export const authFailed = () => {
    return {
        type: actionTypes.AUTH_FAILED,
    }
}



export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type : actionTypes.LOGOUT
    }
}

export const authReset = () => {
    return {
        type: actionTypes.AUTH_RESET
    }
}

export const checkAuthStatus = (expiryTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expiryTime*1000)
    }
}

export const authHandler = (email, password , signIn) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD-Egr8ha6Kp-Wqku7QMhF-PuoPtXWxVL0';
        if (signIn) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD-Egr8ha6Kp-Wqku7QMhF-PuoPtXWxVL0'
        axios.post(url, authData)
            .then(res => {
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('expirationDate', new Date(new Date().getTime() + 1000 *res.data.expiresIn));
                dispatch(authSuccess(res.data.idToken,res.data.localId));
                dispatch(checkAuthStatus(res.data.expiresIn));
            }).catch(error => {
                dispatch(authFailed());
            })
    }
}

export const loginCheck = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            }
            else {
                dispatch(authSuccess(token, localStorage.getItem('userId')));
            }
        }
    }
}