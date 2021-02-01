import { combineReducers } from "redux";
import userReducer from "../_reducer/userReducer";
//! combineReducers은 각 state에 관한 리듀서를 통합해주는 곳.

const rootReducer = combineReducers({
    userReducer,
});

export default rootReducer;
