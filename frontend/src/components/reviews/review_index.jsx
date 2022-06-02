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
        this.setState({reviews: this.props.reviews});
    }
    render() {
        return (
            <div>
                <h1 className="review-index-title">Reviews</h1>
                <ul className="review-index-item-container">
                    {this.state.reviews.map(review=>
                        <ReviewIndexItem key={review._id} review={review} />
                    )}
                </ul>
            </div>
        );
    }
}
