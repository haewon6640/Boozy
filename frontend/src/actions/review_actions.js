import * as ReviewApiUtil from "../util/review_api_util";

export const RECEIVE_REVIEW = "RECEIVE_REVIEW";
export const REMOVE_REVIEW = "REMOVE_REVIEW";

const receiveReview = (review) => ({
    type: RECEIVE_REVIEW,
    review
})

export const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId 
})

export const deleteReview = (reviewId) => dispatch => {
    ReviewApiUtil.deleteReview(reviewId)
        .then(()=>dispatch(removeReview(reviewId)))
}

export const updateReview =(review) => dispatch => {
    ReviewApiUtil.updateReview(review)
        .then((review)=>dispatch(receiveReview(review)))
}
// const receiveReview = () => 
