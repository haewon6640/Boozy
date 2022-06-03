import React, { Component } from 'react'
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';

export default class FilterChoice extends Component {
  render() {
    // console.log(this.props.filter_open)
    return (
      	<div className="radio-box">
          <div className="in-line" onClick={()=>this.props.toggleBarCart("filter_open")}>
            <h2 >Select your main flavor</h2>
            {!this.props.filter_open && <IoIosArrowBack className='arrow'/>}
            {this.props.filter_open && <IoIosArrowDown className='arrow'/>}
          </div>
          {this.props.filter_open && <div>
           <div className='in-line'>
              <input type="radio" 
                name="filter_choice"
                style={{ accentColor: "#EF6079FF" }}
                onChange={()=>this.props.handleSelection('boozy')}
                />
                <label>Boozy</label>
            
          </div>
        <div className='in-line'>     
          <input type="radio" 
            name="filter_choice"
            style={{ accentColor: "#EF6079FF" }}
            onChange={()=>this.props.handleSelection('sweet')}
            />
            <label>Sweet</label>
        </div>
        <div className='in-line'>
          <input type="radio" 
            name="filter_choice"
            style={{ accentColor: "#EF6079FF" }}
            onChange={()=>this.props.handleSelection('sour')}
            />
          <label>Sour</label>
        </div>
        <div className='in-line'>
          <input type="radio" 
            name="filter_choice"
            style={{ accentColor: "#EF6079FF" }}
            onChange={()=>this.props.handleSelection('bitter')}
            />
          <label>Bitter</label>
        </div>
        <div className='in-line'>
          <input type="radio" 
            name="filter_choice"
            style={{ accentColor: "#EF6079FF" }}
            onChange={()=>this.props.handleSelection('salty')}
            />
            <label>Salty </label>
        </div>
        <div className='in-line'>
          <input type="radio" 
            name="filter_choice"
            style={{ accentColor: "#EF6079FF" }}
            onChange={()=>this.props.handleSelection('umami')}
            />
          <label>Umami</label>
        </div>
        <div className='in-line'>
          <input type="radio" 
            name="filter_choice"
            style={{ accentColor: "#EF6079FF" }}
            onChange={()=>this.props.handleSelection('rating')}
            />
          <label>High Rating</label>
        </div> </div>}
		</div>
    )
  }
}
