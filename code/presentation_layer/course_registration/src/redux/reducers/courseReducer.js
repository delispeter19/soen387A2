import { GET_COURSES, ADD_COURSE, DELETE_COURSE } from "../actions/types.js";

const initialState = {
  courses: [],
};

// Note: function has no name so we define ...
// this reducers name in the index file when we import
export default function(state=initialState, action){
    switch (action.type){
        case GET_COURSES:
            return {
                ...state,
                courses: action.payload.data
            };
        case DELETE_COURSE:
            return {
                ...state,
                courses: state.courses.filter(course => course.course_code !== action.payload.data)
            };
        case ADD_COURSE:
            return {
                ...state,
                courses: [...state.courses, action.payload.data]
            };
    default:
      return state;
  }
}
