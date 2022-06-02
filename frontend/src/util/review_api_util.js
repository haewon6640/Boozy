import axios from "axios";

export const createReview = (review) => (
    axios.post(`/api/${review.recipe}/review`, review)
)