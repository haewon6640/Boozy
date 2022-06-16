import React, { Component } from "react";
import ReviewIndexItem from "../reviews/review_index_item";

export default class ReviewIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        }
    }
    componentDidMount() {
        // this.props.fetchReviews()
        this.setState({reviews: this.props.reviews});
    }
    
  
    render() {
        // console.log('REVIEW INDEX RENDERED with the review props of:', this.props.reviews)
        // console.log('REVIEW INDEX STATE is:', this.state.reviews)
        return (
            <div>
                <h1 className="review-index-title">Reviews</h1>
                <ul className="review-index-item-container">
                    {this.props.reviews.map(review=>
                        <ReviewIndexItem key={review._id} review={review} rerenderPage={this.props.rerenderPage} />
                    )}
                </ul>
            </div>
        );
    }
}
