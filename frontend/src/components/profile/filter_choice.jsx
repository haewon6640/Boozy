import React, { Component } from 'react'

export default class FilterChoice extends Component {
  render() {
    return (
      	<div className="radio-container">
          <div className='in-line'>
            <label>Boozy
              <input type="radio" 
                name="filter_choice"
                style={{ accentColor: "#EF6079FF" }}
                onChange={()=>this.props.handleSelection('boozy')}
                />
            </label>
          </div>
        <div className='in-line'>     
          <label>Sweet
            <input type="radio" 
              name="filter_choice"
              style={{ accentColor: "#EF6079FF" }}
              onChange={()=>this.props.handleSelection('sweet')}
              />
          </label>
        </div>
        <div className='in-line'>
          <label>Sour
            <input type="radio" 
              name="filter_choice"
              style={{ accentColor: "#EF6079FF" }}
              onChange={()=>this.props.handleSelection('sour')}
              />
          </label>
        </div>
        <div className='in-line'>
          <label>Bitter
            <input type="radio" 
              name="filter_choice"
              style={{ accentColor: "#EF6079FF" }}
              onChange={()=>this.props.handleSelection('bitter')}
              />
          </label>
        </div>
        <div className='in-line'>
          <label>Salty
            <input type="radio" 
              name="filter_choice"
              style={{ accentColor: "#EF6079FF" }}
              onChange={()=>this.props.handleSelection('salty')}
              />
          </label>
        </div>
        <div className='in-line'>
          <label>Umami
            <input type="radio" 
              name="filter_choice"
              style={{ accentColor: "#EF6079FF" }}
              onChange={()=>this.props.handleSelection('umami')}
              />
          </label>
        </div>
        <div className='in-line'>
          <label>High Rating
            <input type="radio" 
              name="filter_choice"
              style={{ accentColor: "#EF6079FF" }}
              onChange={()=>this.props.handleSelection('rating')}
              />
          </label>
        </div>
		</div>
    )
  }
}
