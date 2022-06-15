import { RECEIVE_RECIPE } from "../actions/recipe_actions";
import { REMOVE_REVIEW, RECEIVE_REVIEW, RECEIVE_REVIEWS } from "../actions/review_actions";

const ReviewsReducer = (state = {}, action) => {
    // console.log("the review state looks like:",state)
    Object.freeze(state);
    let newState = Object.assign({},state);
    switch(action.type) {
        case RECEIVE_RECIPE:
            
            return Object.assign({},action.reviews)
        case REMOVE_REVIEW:
            delete newState[action.review.data._id];
            console.log('the review state after REMOVE_REVIEW',newState)
            return newState;
        case RECEIVE_REVIEW:
            
            newState[action.review.data._id] = action.review.data;
            return newState;
        case RECEIVE_REVIEWS:
            return Object.assign({},action.reviews.data);
        default:
            return state
    }
}

export default ReviewsReducer;