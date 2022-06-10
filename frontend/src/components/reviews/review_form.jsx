import React, { Component } from "react";
const reviewCategories = [
    "boozy",
    "sweet",
    "sour",
    "bitter",
    "salty",
    "umami",
    "rating",
];

export default class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formVisible: false,
            rating: {
                boozy: 0,
                sweet: 0,
                sour: 0,
                bitter: 0,
                salty: 0,
                umami: 0,
                rating: 0,
            },
            title: "",
            body: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log("review_form_show props", this.props);
    }
    reviewDisplay() {
        console.log("hello");
        this.setState({
            formVisible: !this.state.formVisible,
            rating: {
                boozy: 0,
                sweet: 0,
                sour: 0,
                bitter: 0,
                salty: 0,
                umami: 0,
                rating: 0,
            },
            title: "",
            body: "",
        });
    }
    async handleSubmit(e) {
        e.preventDefault();
        let review = {
            rating: this.state.rating,
            title: this.state.title,
            body: this.state.body,
            recipe: this.props.recipe._id
        };
        this.props.createReview(review)
            .then(()=>this.props.fetchRecipe())
        this.setState({
            rating: {
                boozy: 0,
                sweet: 0,
                sour: 0,
                bitter: 0,
                salty: 0,
                umami: 0,
                rating: 0,
            },
            title: "",
            body: "",
        });
    }

    handleSlide(category, e) {
        let newRating = { ...this.state.rating };
        newRating[Object.values(category)[0]] = e.target.value;
        console.log(category, e.target.value, newRating); //you get to this point
        this.setState(
            {
                rating: newRating,
            },
            console.log("State was set to:", this.state.rating)
        );
    }

    update(field) {
        return (e) =>
            this.setState({
                [field]: e.currentTarget.value,
            });
    }

    render() {
        let form;
        let reviewSpan;
        if (this.state.formVisible) {
            form = (
                <form className="review-form two-col" onSubmit={this.handleSubmit}>
                    <div className="form-first-column ratings-container">
                        <span className="rating-header">
                            {" "}
                            How does this drink taste?{" "}
                        </span>
                        {reviewCategories.map((category, i) => (
                            <div className="ratings-wrapper">
                                {console.log(category)}
                                <div className="category">{category}</div>
                                <input
                                    className={`rating-slider ${category}-slider`}
                                    type="range"
                                    min={0}
                                    max={10}
                                    value={
                                        this.state.rating[category]
                                            ? this.state.rating[category]
                                            : null
                                    }
                                    onClick={(e) =>
                                        this.handleSlide({ category }, e)
                                    }
                                />
                                <div className="category-value-text">
                                    {this.state.rating[category]}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="form-second-column">
                        <label> Title</label>
                        <input
                            className="review-title-input"
                            type="text"
                            value={this.state.title}
                            onChange={this.update("title")}
                        />
                        <label> Body</label>
                        <textarea
                            className="review-body-input"
                            type="text"
                            value={this.state.body}
                            onChange={this.update("body")}
                        />
                        <button className="btn">
                            <span className="">Submit Review</span>
                        </button>
                    </div>
                </form>
            );
            reviewSpan = <span className="">Close Review</span>;
        } else {
            reviewSpan = <span className="">Review it!</span>;
        }
        return (
            <div>
                {form}
                <div className="review-form-initiator">
                    <h2 className="review-form-header">
                        Review this Cocktail!
                    </h2>
                    <a className="btn" onClick={this.reviewDisplay.bind(this)}>
                        {reviewSpan}
                    </a>
                </div>
            </div>
        );
    }
}
