import { CREATE_MESSAGE, DELETE_MESSAGE, GET_ERRORS, DELETE_ERRORS } from "./types";

// CREATE MESSAGE
export const createMessage = msg => {
    return {
        type: CREATE_MESSAGE,
        payload: msg
    };
}

// REMOVE MESSAGES
export const removeMessages = () => {
    return {
        type: DELETE_MESSAGE
    };
}

// RETURN ERROR MESSAGES
export const returnErrors = (msg, status) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status }
    }
}

// REMOVE ERRORS
export const removeErrors = () => {
    return {
        type: DELETE_ERRORS
    };
}
