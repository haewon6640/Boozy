import axios from "axios";

export const createReview = (review) => (
    axios.post(`/api/recipes/${review.recipe}/review`, review)
);

export const updateReview = (review) => (
    axios.post(`/api/reviews/${review._id}`)
)

export const deleteReview = (reviewId) => (
    axios.post(`/api/reviews/${reviewId}/delete`)
)

export const getReviews = () => (
    axios.get(`/api/reviews`)
)