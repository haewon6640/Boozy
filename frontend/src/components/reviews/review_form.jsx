import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BiErrorCircle } from 'react-icons/bi';
import { FaStar } from "react-icons/fa";
function Star({ filled, onClick }) {
  return (
    <FaStar 
     color={filled ? "orange" : "lightgray"} 
     onClick={onClick} />
  );
}


const reviewCategories = [
    "boozy",
    "sweet",
    "sour",
    "bitter",
    "salty",
    "umami",
];

export default class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        // console.log("review_form_show props", this.props);
    }
    reviewDisplay() {
        this.props.openModal("formVisible");
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
          // console.log(e.target.value)
        let newRating = { ...this.state.rating };
        newRating[Object.values(category)[0]] = e.target.value;
        // console.log(category, e.target.value, newRating); //you get to this point
        this.setState(
            {
                rating: newRating,
            }
            // console.log("State was set to:", this.state.rating)
        );
    }

    update(field) {
        let errorName = `${field}Error`
        return (e) =>
            this.setState({
                [field]: e.currentTarget.value,[errorName]:false
            });
    }
    closeModal() {
        document.getElementById("modal").classList.remove("showModal");
        document.getElementById("modal").classList.add("hideModal");
        setTimeout(() => this.props.closeModal(), 250);
        this.setState({titleError:false, ratingError:false, bodyError:false})
    }
    handleClick=(value)=> {
      let newRating = Object.assign({}, this.state.rating.rating)
      newRating.rating = value
      this.setState({rating:newRating, ratingError:false})
    }
    handleSubmit(e) {
      e.preventDefault();
      
      if (this.state.rating.rating !== 0 && this.state.title !== "" && this.state.body !== "" ) {
          let review = {
              rating: this.state.rating,
              title: this.state.title,
              body: this.state.body,
              recipe: this.props.recipe._id,
          };
          this.props
              .createReview(review)
              .then(() => this.props.rerenderPage())
              .then(() => {
                  this.props.fetchReviews();
              })
              .then(() => {
                  document.getElementById("modal").classList.remove("showModal");
                  document.getElementById("modal").classList.add("hideModal");
                  this.props.closeModal();
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
              })
              .then(this.props.rerenderPage());
        } else {
          if (this.state.title ==='') this.setState({titleError:true})
          if (this.state.rating.rating === 0) this.setState({ratingError:true})
          if (this.state.body === '')  this.setState({bodyError:true})
        }          
         
  }

    render() {
        // console.log('the current user is:', this.props.currentUser)
        let form;
        let reviewSpan;
        let reviewButton;
        if (this.props.currentUser && Object.values(this.props.currentUser).length) {
            reviewButton = (
                <h2
                    className="review-form-header"
                    onClick={this.reviewDisplay.bind(this)}
                >
                    Review this Cocktail!
                </h2>
            );
        } else {
            reviewButton = (
                <Link to="/Login" className="review-form-header">
                    Login to Review this Cocktail!
                </Link>
            );
        }
        if (this.props.modal) {
            form = (
                // instantly invoking the closeModal function reset the form dont do that.
                <div
                    id="modal"
                    className={`modal-background showModal`}
                    onClick={() => this.closeModal()}
                >
                    <div
                        className="modal-container-background"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <form
                            className="review-form two-col"
                            onSubmit={this.handleSubmit}
                        >
                            <div className="form-first-column ratings-container">
                                <span className="rating-header">
                                    {" "}
                                    How does this drink taste?{" "}
                                </span>
                                {reviewCategories.map((category, i) => (
                                    <div className="ratings-wrapper">
                                        {/* {console.log(category)} */}
                                        <div className="category">
                                            {category}
                                        </div>
                                        <input
                                            className={`rating-slider ${category}-slider`}
                                            type="range"
                                            min={0}
                                            max={10}
                                            value={this.state.rating[category]}
                                            // defaultValue={0}
                                            onChange={(e) =>
                                                this.handleSlide(
                                                    { category },
                                                    e
                                                )
                                            }
                                        />
                                        <div className="category-value-text">
                                            {this.state.rating[category]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="form-second-column">
                              <div className="input-error">
                                  <div className="in-line" id="rating-stars">
                                      <label >Rating</label>
                                          <div className='overall-rating'>
                                              {[1, 2, 3, 4, 5].map((value) => (
                                                  <Star
                                                      key={value}
                                                      onClick={()=>this.handleClick(value)}
                                                      filled={value <= this.state.rating.rating}
                                                      
                                                  />
                                              ))}
                                        </div>
                                    </div>
                                  {this.state.ratingError === true && <div className='error'><BiErrorCircle/> Reviews must have a rating </div>}
                              </div>                                  
                              <div className="input-error">                                  
                                  <label> Title</label>
                                  <input
                                      className="review-title-input"
                                      type="text"
                                      value={this.state.title}
                                      onChange={this.update("title")}
                                  />
                                  {this.state.titleError === true && <div className='error'><BiErrorCircle/> Reviews must have a title </div>}
                                </div>
                                <div className="input-error">                                  
                                <label> Body</label>
                                  <textarea
                                    className="review-body-input"
                                    type="text"
                                    value={this.state.body}
                                    onChange={this.update("body")}
                                    />
                                    {this.state.bodyError === true && <div className='error'><BiErrorCircle/> Reviews must have a body </div>}
                                  </div>
                                <button className="btn">
                                    <span className="">Submit Review</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
        // console.log('review form props', this.props)
        return (
            <div>
                {form}
                <div className="review-form-initiator">{reviewButton}</div>
            </div>
        );
    }
}
