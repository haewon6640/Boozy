import * as ReviewApiUtil from "../util/review_api_util";

export const RECEIVE_REVIEW = "RECEIVE_REVIEW";
export const RECEIVE_REVIEWS = "RECEIVE_REVIEWS";
export const REMOVE_REVIEW = "REMOVE_REVIEW";

const receiveReview = (review) => ({
    type: RECEIVE_REVIEW,
    review
})
const receiveReviews = (reviews) => ({
    type: RECEIVE_REVIEWS,
    reviews
})

export const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId 
})

export const fetchReviews = () => dispatch => (
    ReviewApiUtil.getReviews()
        .then(reviews=>dispatch(receiveReviews(reviews)))
)
export const deleteReview = (reviewId) => dispatch => {
    ReviewApiUtil.deleteReview(reviewId)
        .then(()=>dispatch(removeReview(reviewId)))
}

export const updateReview =(review) => dispatch => {
    ReviewApiUtil.updateReview(review)
        .then((review)=>dispatch(receiveReview(review)))
}
// const receiveReview = () => 
