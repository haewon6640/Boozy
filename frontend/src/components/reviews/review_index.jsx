import React, { Component } from "react";
import ReviewIndexItem from "../reviews/review_index_item";

export default class ReviewIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        }
        this.fetchReviews = this.props.fetchReviews.bind(this)
    }
    componentDidMount() {
        this.props.fetchReviews().then(
        this.setState({reviews: this.props.reviews})
        )
    }
   
    
  
    render() {
        
        
        return (
            <div>
                <h1 className="review-index-title">Reviews</h1>
                <ul className="review-index-item-container">
                    {this.props.reviews.map(review=>
                        <ReviewIndexItem key={review._id} review={review} fetchReviews={this.props.fetchReviews} />
                    )}
                </ul>
            </div>
        );
    }
}
