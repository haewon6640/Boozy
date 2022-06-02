import React, { Component } from 'react'
const reviewCategories = ['boozy', 'sweet', 'sour', 'bitter', 'salty', 'umami','rating']

export default class ReviewForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      reviewer: this.props.user,
      rating: [
        {boozy: 0},
        {sweet: 3},
        {sour: 0},
        {bitter: 0},
        {salty: 0},
        {umami: 0},
        {rating: 0}
      ],
      title: "",
      body: ""
      }
      console.log('review_form_show props', this.props)

    }


    handleSlide(category,i) {

    if (this.state.rating) {
      let newRatings = this.state.rating;
      for (let i = 0; i < newRatings.length; i++) {
        this.state.rating[i]
        
      }
    }
      return e => this.setState({
        [rating]: 
      })
    }
  

  render() {
    let categoryNum
    return (
      <div>
        <form className="review-form hidden">
          form body
        <div className="ratings-container">
          {reviewCategories.map((category,i) =>(
            <div className='ratings-wrapper'>
              
              <div className="category">{category}</div>
              <input  className='rating-slider' type="range" min={0} max={10} value={(this.state.rating[i]) ? (this.state.rating[i][category]): null} onChange={this.handleSlide(category,i)}/>
              <div className="category-value-text">{(this.state.rating[i]) ? (this.state.rating[i][category]): null}</div>
            </div>
          )
          )}
        </div>
          
        </form>
        <div className="review-form-initiator">
          <h2 className="review-form-header">Review this Cocktail!</h2>
          <a className="btn" href="#/recipes/new"><span className="">Review it!</span></a>
        </div>

      </div>
    )
  }
}
