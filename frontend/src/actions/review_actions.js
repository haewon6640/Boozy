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

export const removeReview = (review) => ({
    type: REMOVE_REVIEW,
    review
})

export const fetchReviews = () => dispatch => (
    ReviewApiUtil.getReviews()
        .then(reviews=>dispatch(receiveReviews(reviews)))
)
export const deleteReview = (reviewId) => dispatch => {
    ReviewApiUtil.deleteReview(reviewId)
        .then((review)=>dispatch(removeReview(review)))
        .catch(err=>console.log(err))
}

export const updateReview = (review) => dispatch => {
    return ReviewApiUtil.updateReview(review)
        .then((review)=>dispatch(receiveReview(review)))
}

export const createReview =(review, recipeId) => dispatch => {
  return ReviewApiUtil.createReview(review, recipeId)
        .then((review)=>dispatch(receiveReview(review)))
}
// const receiveReview = () => 
