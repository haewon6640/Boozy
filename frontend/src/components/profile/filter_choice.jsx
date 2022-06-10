import React, { Component } from 'react'
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';

export default class FilterChoice extends Component {
  constructor(props){
    super(props)
    this.titleize= this.titleize.bind(this)
  }
  titleize(word) {
    word= word.slice(0,1).toUpperCase() + word.slice(1).toLowerCase() 
    if (word === "Rating") word = "High Rating"
    return word
  }

  render() {
    let flavors = ["boozy", "sweet", 'sour', 'bitter', 'salty', 'umami', 'rating']
    return (
      	<div className="radio-box">
          <div className="in-line" onClick={()=>this.props.toggleBarCart("filter_open")}>
            <h2>Your Preference</h2>
            {!this.props.filter_open && <IoIosArrowBack className='arrow'/>}
            {this.props.filter_open && <IoIosArrowDown className='arrow'/>}
          </div>
          {this.props.filter_open && flavors.map((flavor)=> {
            return (<div className='in-line'>
              <input type="radio" 
              name="filter_choice"
              style={{ accentColor: "#EF6079FF" }}
              onChange={()=>this.props.handleSelection("filter_choice",flavor)}
              key={flavor}
              />
              <label>{this.titleize(flavor)}</label>
            </div>
          )})}
		</div>
    )
  }
}
