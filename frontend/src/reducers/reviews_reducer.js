import { RECEIVE_RECIPE } from "../actions/recipe_actions";
import { REMOVE_REVIEW, RECEIVE_REVIEW } from "../actions/review_actions";

const ReviewsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({},state);
    switch(action.type) {
        case RECEIVE_RECIPE:
            return Object.assign({},action.reviews)
        case REMOVE_REVIEW:
            delete newState[action.reviewId];
            return newState;
        case RECEIVE_REVIEW:
            newState[action.review._id] = action.review;
            return newState;
        default:
            return state
    }
}

export default ReviewsReducer;