import React, { Component } from 'react'
import { connect } from 'react-redux'
const reviewCategories = ['boozy', 'sweet', 'sour', 'bitter', 'salty', 'umami']
export class ReviewForm extends Component {
  constructor(props){
    super(props)
    console.log('this is the props', props)
  }

  render() {
    return (
      <div>
        <form className="review-form hidden">
          form body
        <div className="ratings-container">
          {reviewCategories.map(category =>(
            <div>
              <span className="category">{category}</span>
              <input type="range" min="0" max="10" value="0" className="review-slider"/>
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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)