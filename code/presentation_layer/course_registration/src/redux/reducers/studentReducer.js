import { GET_STUDENTS, ADD_STUDENT, DELETE_STUDENT } from "../actions/types.js";

const initialState = {
  students: [],
};

// Note: function has no name so we define ...
// this reducers name in the index file when we import
export default function(state=initialState, action){
    switch (action.type){
        case GET_STUDENTS:
            return {
                ...state,
                students: action.payload.data
            };
        case DELETE_STUDENT:
            return {
                ...state,
                students: state.students.filter(student => student.id !== action.payload.data)
            };
        case ADD_STUDENT:
            return {
                ...state,
                students: [...state.students, action.payload.data]
            };
    default:
      return state;
  }
}
