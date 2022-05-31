import { RECEIVE_USER } from "../actions/user_actions";
import { RECEIVE_USER_SIGN_IN } from "../actions/session_actions";

const UserReducer = (state={}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_USER:
            return Object.assign({}, state, action.user)
        case RECEIVE_USER_SIGN_IN: {
            return Object.assign({}, state, action.user)
        }
        default:
            return state;
    }
}
export default UserReducer
