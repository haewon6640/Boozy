import React from 'react'
import { FaStar } from "react-icons/fa";
import {Link} from "react-router-dom";
function Star({ filled, onClick }) {
  return (
    <FaStar 
     color={filled ? "orange" : "lightgray"} 
     onClick={onClick} />
  );
}

const ReviewIndexItem = ({review}) => {
    let titleExists = review.title.length !== 0;
    let bodyExists = review.body.length !== 0;
    if (!titleExists || !bodyExists) {
        return null;
    }
    const rating = {boozy: 3, sweet:2, sour: 3, bitter: 2, salty: 4, umami: 1, rating: 3};
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
                    {Object.keys(rating).map((taste, idx) => 
                        <span key={idx} className="flavor_profile_item">
                            {<strong>{taste}</strong>}{`: ${rating[taste]}`}
                        </span>
                    )}
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
        </li>
    )

}

export default ReviewIndexItem;
