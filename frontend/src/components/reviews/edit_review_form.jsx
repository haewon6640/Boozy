import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {connect } from "react-redux";
import { closeModal, openModal } from "../../actions/modal_actions";
import {updateReview} from "../../actions/review_actions"
import { FaStar } from "react-icons/fa";
import { BiErrorCircle } from 'react-icons/bi';
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


class EditReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: props.review._id,
            rating: props.review.rating,
            title: props.review.title,
            body: props.review.body,
            overallRating:0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        // console.log("review_form_show props", this.props);
    }

    handleSlide(category, e) {
        //   console.log(e.target.value)
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
        this.props.setShow(false);
        document.getElementById("modal").classList.remove("showModal");
        document.getElementById("modal").classList.add("hideModal");
        setTimeout(() => this.props.closeModal(), 250);
        this.setState({titleError:false, ratingError:false, bodyError:false})
    }
    handleClick=(value)=> {
      this.setState({overallRating:value, ratingError:false})
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.overallRating !== 0 && this.state.title !== "" && this.state.body !== "" ) {
          let newRating = (Object.assign({}, this.state.rating))
          newRating.rating= this.state.overallRating
          let review = {
              _id: this.state._id,
              rating: newRating,
              title: this.state.title,
              body: this.state.body,
              recipe: this.props.recipe._id,
          };
          this.props
              .updateReview(review)
              .then(() => {
                  document.getElementById("modal").classList.remove("showModal");
                  document.getElementById("modal").classList.add("hideModal");
                  this.props.setShow(false);
                  this.props.closeModal();
              })
              .then(this.props.rerenderPage());
            } else {
              if (this.state.title ==='') this.setState({titleError:true})
              if (this.state.overallRating === 0) this.setState({ratingError:true})
              if (this.state.body === '')  this.setState({bodyError:true})
            }     
    }

    render() {
        // console.log('the current user is:', this.props.currentUser)
        let form;
        if (this.props.show && this.props.modal !== "formVisible") {
            this.props.openModal("formVisible");
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
                                                      filled={value <= this.state.overallRating}
                                                      
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
                                    <span className="">Update Review</span>
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
            </div>
        );
    }
}

const mSTP = (state,ownProps) => ({
    modal: state.ui.modal,
    recipe: state.entities.recipes.all[ownProps.match.params.id],
})
const mDTP = dispatch => ({
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    updateReview: (review)=> dispatch(updateReview(review))
})

export default withRouter(connect(mSTP, mDTP)(EditReviewForm));