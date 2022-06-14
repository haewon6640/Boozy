import React, { Component } from "react";
import {Link} from 'react-router-dom'
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
        // this.handleSubmit = this.handleSubmit.bind(this);
        // console.log("review_form_show props", this.props);
    }
    reviewDisplay() {
        
        this.props.openModal('formVisible')
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
    //   console.log(e.target.value) 
        let newRating = { ...this.state.rating };
        newRating[Object.values(category)[0]] = e.target.value;
        // console.log(category, e.target.value, newRating); //you get to this point
        this.setState(
            {
                rating: newRating,
            },
            // console.log("State was set to:", this.state.rating)
        );
    }

    update(field) {
        return (e) =>
            this.setState({
                [field]: e.currentTarget.value,
            });
    }
    closeModal(){
      document.getElementById('modal').classList.remove('showModal')
      document.getElementById('modal').classList.add('hideModal')
      setTimeout(()=>this.props.closeModal(),250)  
    }

  

    render() {
        let form;
        let reviewSpan;
        let reviewButton;
        if (this.props.currentUser) {
            reviewButton =   (<h2 className="review-form-header"
            onClick={this.reviewDisplay.bind(this)}>
              Review this Cocktail!
          </h2>)
        } else {
            reviewButton = (
                <Link to="/Login" className="review-form-header">Review this Cocktail!</Link>
            )
        }
        if (this.props.modal) {

            form = (
              // instantly invoking the closeModal function reset the form dont do that.
              <div id= 'modal' className={`modal-background showModal`} onClick={() => this.closeModal()}>
                <div className="modal-container-background" onClick={e => e.stopPropagation()}>
                  <form className="review-form two-col" onSubmit={()=> this.props.handleSubmit(
                    this.state.rating,this.state.title,this.state.body,this.props.recipe._id)}>
                      <div className="form-first-column ratings-container">
                          <span className="rating-header">
                              {" "}
                              How does this drink taste?{" "}
                          </span>
                          {reviewCategories.map((category, i) => (
                              <div className="ratings-wrapper">
                                  {/* {console.log(category)} */}
                                  <div className="category">{category}</div>
                                  <input
                                      className={`rating-slider ${category}-slider`}
                                      type="range"
                                      min={0}
                                      max={10}
                                      value={this.state.rating[category]}
                                      // defaultValue={0}
                                      onChange={(e) =>
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
                </div>
              </div>
            );
        } 
        // console.log('review form props', this.props)
        return (
            <div>
                {form}
                <div className="review-form-initiator">
                  { reviewButton }
                </div>
            </div>
        );
    }
}
