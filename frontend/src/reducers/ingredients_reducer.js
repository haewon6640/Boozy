
import {RECEIVE_INGREDIENTS} from "../actions/ingredient_actions";

const IngredientsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({},state);
    switch(action.type) {
        case RECEIVE_INGREDIENTS:
            return Object.assign({},action.ingredients)
        default:
            return state
    }
}

export default IngredientsReducer;