import axios from 'axios';
import { createMessage, returnErrors } from './messageActions';
import { apiconfig } from './authActions';
import { GET_COURSES, ADD_COURSE, DELETE_COURSE } from './types';

// GET STUDENTS API CALL
export const getCourses = () => (dispatch, getState) => {

    const config = apiconfig(getState);

    axios.get('http://localhost:8080/a2_war/course/get.jsp', config)
        .then(res => {
            dispatch({
                type: GET_COURSES,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// POST STUDENT API CALL
export const addCourse = (course) => (dispatch, getState) => {

    const config = apiconfig(getState);

    axios.post('http://localhost:8080/a2_war/course/post.jsp', course, config)
        .then(res => {
            dispatch(createMessage({
                createCourse: 'Course Created'
            }));
            dispatch({
                type: ADD_COURSE,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE STUDENT API CALL
export const deleteCourse = (code) => (dispatch, getState) => {

    const config = apiconfig(getState);

    axios.post(`http://localhost:8080/a2_war/course/delete.jsp?code=${code}`, config)
        .then(res => {
            dispatch(createMessage({
                deleteCourse: 'Course Removed'
            }));
            dispatch({
                type: DELETE_COURSE,
                payload: res.data
            });
        }).catch(err => console.log(err));
}
