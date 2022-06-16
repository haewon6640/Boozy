import React from 'react'
import { FaStar } from "react-icons/fa";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {updateReview, deleteReview} from "../../actions/review_actions";

function Star({ filled, onClick }) {
  return (
    <FaStar 
     color={filled ? "orange" : "lightgray"} 
     onClick={onClick} />
  );
}

const ReviewIndexItem = (props) => {
    const {review,currUserId} = props
    let modify_review;
    let titleExists = review.title.length !== 0;
    let bodyExists = review.body.length !== 0;
    if (!titleExists || !bodyExists) {
        return null;
    }
    const rating = props.review.rating;
    
    if  (review.reviewer._id === currUserId) {

      modify_review =( <ul className="modify-review">
           <li className='edit-review'>Edit</li>
           <li onClick={() => props.deleteReview(review._id)} className='delete-review'>Delete</li>
       </ul>)
     }
  
    return (
        <li className="review-index-item">
            <div className="review-item-top-row">
                <span className='overall-rating'>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <Star
                            key={value}
                            filled={value <= rating["rating"]}
                        />
                    ))}
                </span>
                <span className='flavor_profile'>
                    {Object.keys(rating).map((taste, idx) => {
                        if (taste === "rating") {
                            return null;
                        }
                        return <span key={idx} className="flavor_profile_item">
                            {<strong>{taste}</strong>}{`: ${rating[taste]}`}
                        </span>
                    })}
                </span>
            </div>
            
            <div className="review-item-bottom-row">
                <div className="review-item-title">
                    {review.title}
                </div>
                <Link className="reviewer" to={`/users/${review.reviewer._id}`}>
                    By {review.reviewer.handle}
                </Link>
            </div>

            <div className="review-item-body">
                {review.body}
            </div>
           {modify_review}
        </li>
    )

}

const mSTP = state => {
    if (!state.session.isAuthenticated) {
        return {currUserId: ""}
    } else {
        return {currUserId: state.session.user.id}
    }
}

const mDTP = dispatch => ({
    updateReview: (review)=> dispatch(updateReview(review)),
    deleteReview: (reviewId) => dispatch(deleteReview(reviewId))
})
export default connect(mSTP,mDTP)(ReviewIndexItem);
