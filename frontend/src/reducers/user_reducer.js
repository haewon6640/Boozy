import { RECEIVE_USER } from "../actions/user_actions";

const UserReducer = (state={}, action) => {
    Object.freeze(state);
    let newState = Object.assign({},state);
    switch(action.type) {
        case RECEIVE_USER:
            return Object.assign({}, state, action.user)
        default:
            return state;
    }
}
export default UserReducer
