import { TYPE_USER } from "../_action/types";

export default function userReducer(state, action) {
    switch (action.type) {
        case TYPE_USER:
            return { ...state, loginSuccess: action.payload };
        default:
            return "";
    }
}
