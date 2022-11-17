import { GET_ADMINS, ADD_ADMIN, DELETE_ADMIN } from "../actions/types.js";

const initialState = {
  admins: [],
};

// Note: function has no name so we define ...
// this reducers name in the index file when we import
export default function(state=initialState, action){
    switch (action.type){
        case GET_ADMINS:
            return {
                ...state,
                admins: action.payload.data
            };
        case DELETE_ADMIN:
            return {
                ...state,
                admins: state.admins.filter(admin => admin.employment_id !== action.payload.data)
            };
        case ADD_ADMIN:
            return {
                ...state,
                admins: [...state.admins, action.payload.data]
            };
    default:
      return state;
  }
}
