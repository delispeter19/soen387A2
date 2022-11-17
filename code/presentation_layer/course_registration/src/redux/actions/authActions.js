import axios from 'axios';
import { createMessage, returnErrors } from './messageActions';
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// HELPER FUNCTION FOR API TOKEN SETUP
export const apiconfig = (getState) => {

    // GET TOKEN FROM THE STATE
    const token = getState().authReducer.token;

    // SET UP HEADERS
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // CHECK IF TOKEN EXISTS FOR AUTHORIZATION
    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
}

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    const config = apiconfig(getState);

    axios.get('http://localhost:8080/a2_war/auth/user.jsp', config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(err => {
            if (err.response){
                dispatch(returnErrors(err.response.data, err.response.status));
            }
            dispatch({
                type: AUTH_ERROR
            })
        });    
}

// LOGIN STUDENT
export const loginStudent = (email, password) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({email, password});

    axios.post('http://localhost:8080/a2_war/auth/student-login.jsp', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            if (err.response){
                dispatch(returnErrors(err.response.data, err.response.status));
            }
            dispatch({
                type: LOGIN_FAIL
            })
        });
}

// LOGIN ADMIN
export const loginAdmin = (email, password) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({email, password});

    axios.post('http://localhost:8080/a2_war/auth/admin-login.jsp', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            })
        });
}

// LOGOUT USER
export const logout = () => (dispatch, getState) => {

    const config = apiconfig(getState);

    axios.post('http://localhost:8080/a2_war/auth/logout.jsp', null, config)
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}

// POST STUDENT API CALL
export const registerStudent = (student) => (dispatch, getState) => {

    const config = apiconfig(getState);

    axios.post('http://localhost:8080/a2_war/student/post.jsp', student, config)
        .then(res => {
            dispatch(createMessage({
                registration: 'Student Account Registered'
            }));
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL
            });
        });
}

// POST ADMIN API CALL
export const registerAdmin = (student) => (dispatch, getState) => {

    const config = apiconfig(getState);

    axios.post('http://localhost:8080/a2_war/student/post.jsp', student, config)
        .then(res => {
            dispatch(createMessage({
                registration: 'Administrator Account Registered'
            }));
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL
            });
        });
}
