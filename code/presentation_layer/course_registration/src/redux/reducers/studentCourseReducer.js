import { DELETE_STUDENT_COURSE, GET_COURSES_BY_STUDENT, GET_STUDENTS_BY_COURSE, ADD_STUDENT_COURSE } from '../actions/types';

const initialState = {
  students: [],
  courses: [],
};

// Note: function has no name so we define ...
// this reducers name in the index file when we import
export default function(state=initialState, action){
    switch (action.type){
        case GET_COURSES_BY_STUDENT:
            return {
                ...state,
                courses: action.payload.data
            };
        case GET_STUDENTS_BY_COURSE:
            return {
                ...state,
                students: action.payload.data
            };
        case DELETE_STUDENT_COURSE:
            return {
                ...state,
                courses: state.courses.filter(course => course.course_code !== action.payload.data.course_code),
                students: state.students.filter(student => student.id !== action.payload.data.id)
            };
        case ADD_STUDENT_COURSE:
            return {
                ...state,
                courses: [...state.courses, action.payload.data]
            };
    default:
      return state;
  }
}
