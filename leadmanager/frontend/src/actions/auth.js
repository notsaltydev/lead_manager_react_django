import axios from 'axios';
import {returnErrors} from "./messages";

import {
    AUTH_ERROR,
    CLEAR_LEADS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    USER_LOADING
} from './types';

// CHECK USER & TOKEN
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({type: USER_LOADING});

    axios.get('/api/auth/user', tokenConfig(getState))
        .then((response) => {
            dispatch({
                type: USER_LOADED,
                payload: response.data
            })
        })
        .catch((error) => {
            dispatch(returnErrors(error.response.data, error.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

// LOGIN USER
export const login = (username, password) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({
        username,
        password
    });

    axios.post('/api/auth/login', body, config)
        .then((response) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })
        })
        .catch((error) => {
            dispatch(returnErrors(error.response.data, error.response.status));
            dispatch({
                type: LOGIN_FAIL
            });
        });
};
// REGISTER USER
export const register = ({username, email, password}) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({
        username,
        password,
        email
    });

    axios.post('/api/auth/register', body, config)
        .then((response) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            })
        })
        .catch((error) => {
            dispatch(returnErrors(error.response.data, error.response.status));
            dispatch({
                type: REGISTER_FAIL
            });
        });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    axios.post('/api/auth/logout', null, tokenConfig(getState))
        .then((response) => {
            dispatch({type: CLEAR_LEADS});
            dispatch({
                type: LOGOUT_SUCCESS
            })
        })
        .catch((error) => {
            dispatch(returnErrors(error.response.data, error.response.status));
        });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
};
