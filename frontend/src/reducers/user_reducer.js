import { RECEIVE_USER } from "../actions/user_actions";
import { RECEIVE_USER_SIGN_IN } from "../actions/session_actions";
import { REMOVE_FROM_SHELF } from "../actions/user_actions";
const UserReducer = (state={}, action) => {
    Object.freeze(state);
    let newState = Object.assign({},state);
    switch(action.type) {
        case RECEIVE_USER:
            return Object.assign({}, state, action.user)
        case RECEIVE_USER_SIGN_IN: 
            return Object.assign({}, state, action.user)
        case REMOVE_FROM_SHELF:
            let user = newState[action.currUserId];
            let shelf = user.shelf.filter(val=>val !== action.ingredientId);
            newState[action.currUserId].shelf = shelf;
            return newState;
        default:
            return state;
    }
}
export default UserReducer
