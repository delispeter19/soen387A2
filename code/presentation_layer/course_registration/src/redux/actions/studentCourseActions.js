import axios from 'axios';
import { createMessage, returnErrors } from './messageActions';
import { apiconfig } from './authActions';
import { ADD_STUDENT_COURSE, DELETE_STUDENT_COURSE, GET_COURSES_BY_STUDENT, GET_STUDENTS_BY_COURSE } from './types';

// GET COURSES BY STUDENT API CALL
export const getCoursesByStudent = (id) => (dispatch, getState) => {

    const config = apiconfig(getState);

    axios.get(`http://localhost:8080/a2_war/student-course/get_courses.jsp?id=${id}`, config)
        .then(res => {
            dispatch({
                type: GET_COURSES_BY_STUDENT,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// GET STUDENTS BY COURSE API CALL
export const getStudentsByCourse = (code) => (dispatch, getState) => {

    const config = apiconfig(getState);

    axios.get(`http://localhost:8080/a2_war/student-course/get_students.jsp?code=${code}`, config)
        .then(res => {
            dispatch({
                type: GET_STUDENTS_BY_COURSE,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// POST STUDENT-COURSE API CALL
export const addStudentCourse = (student_id, course_code) => (dispatch, getState) => {

    const config = apiconfig(getState);

    const body = JSON.stringify({student_id, course_code});

    axios.post('http://localhost:8080/a2_war/student-course/post.jsp', body, config)
        .then(res => {
            dispatch(createMessage({
                registerCourse: 'Course Registered!'
            }));
            dispatch({
                type: ADD_STUDENT_COURSE,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE STUDENT-COURSE API CALL
export const deleteStudentCourse = (id, code) => (dispatch, getState) => {

    const config = apiconfig(getState);

    axios.post(`http://localhost:8080/a2_war/student-course/delete.jsp?id=${id}&code=${code}`, config)
        .then(res => {
            dispatch(createMessage({
                courseDrop: "Course Dropped"
            }));
            dispatch({
                type: DELETE_STUDENT_COURSE,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}
