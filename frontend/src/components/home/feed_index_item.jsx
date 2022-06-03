import React from "react";
import {Link} from "react-router-dom";
import {timeSince} from "../../util/helper";
import {FaStar} from "react-icons/fa";
function Star({ filled, onClick }) {
    return (
      <FaStar 
        size={20}
        color={filled ? "orange" : "lightgray"} 
        onClick={onClick} />
    );
  }

const FeedIndexItem = ({item}) => {
    let display;
    // Review
    let time = `Posted ${timeSince(new Date(item.createdAt))} ago`;
    if (item.title) {
        display = (
            <div>
                <div className="feed-item-top">
                    <div>
                        <Link to={`/users/item.reviewer._id`} className="feed-item-handle">{item.reviewer.handle}</Link>
                        {" reviewed "}
                        <Link className="feed-item-review-recipe-name" to={`/recipes/${item.recipe._id}`}>{item.recipe.name}</Link>
                    </div>
                    <p className="feed-item-time">{time}</p>
                </div>
                <span className="feed-recipe-rating">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <Star
                            key={value}
                            filled={value <= item.rating["rating"]}
                        />
                    ))}
                </span>
                <div className="feed-review-recipe-item">
                    <img className="feed-recipe-img"src={item.recipe.imgUrl} alt="Image" />
                    <div className="feed-review-body">{item.body}</div>
                </div>
            </div>
        )
    // Recipe   
    } else {

    }

    return (
        <div className="feed-index-item-container">
            {display}
        </div>
    );
}
export default FeedIndexItem;