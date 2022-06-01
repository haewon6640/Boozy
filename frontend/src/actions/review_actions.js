import { RECEIVE_RECIPE } from "../actions/recipe_actions";

const ReviewsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({},state);
    switch(action.type) {
        case RECEIVE_RECIPE:
            return Object.assign({},action.reviews)
        default:
            return state
    }
}

export default ReviewsReducer;