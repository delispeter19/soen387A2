import { CREATE_MESSAGE, DELETE_MESSAGE } from "../actions/types";

const initialState = {};

export default function(state=initialState, action){
    switch (action.type){
        case CREATE_MESSAGE:
            return action.payload;
        case DELETE_MESSAGE:
            return initialState;
        default:
            return state;
    }
}
