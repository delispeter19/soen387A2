import { combineReducers } from "redux";
import authReducer from "./authReducer";
import studentReducer from "./studentReducer";
import adminReducer from "./adminReducer";
import courseReducer from "./courseReducer";
import studentCourseReducer from "./studentCourseReducer";
import errorReducer from "./errorReducer";
import messageReducer from "./messageReducer";

// Overwrite this redux element
export default combineReducers({
    authReducer,
    studentReducer,
    adminReducer,
    courseReducer,
    studentCourseReducer,
    errorReducer,
    messageReducer
});
