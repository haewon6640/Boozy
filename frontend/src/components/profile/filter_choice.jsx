import React, { Component } from 'react'

export default class FilterChoice extends Component {
  render() {
    return (
      	<div className="radio-container">
			<label>Boozy
				<input type="radio" 
					name="filter_choice"
					style={{ accentColor: "#EF6079FF" }}
					onChange={()=>this.props.handleSelection('boozy')}
					/>
			</label>
			<label>Sweet
				<input type="radio" 
					name="filter_choice"
					style={{ accentColor: "#EF6079FF" }}
					onChange={()=>this.props.handleSelection('sweet')}
					/>
			</label>
			<label>Sour
				<input type="radio" 
					name="filter_choice"
					style={{ accentColor: "#EF6079FF" }}
					onChange={()=>this.props.handleSelection('sour')}
					/>
			</label>
			<label>Bitter
				<input type="radio" 
					name="filter_choice"
					style={{ accentColor: "#EF6079FF" }}
					onChange={()=>this.props.handleSelection('bitter')}
					/>
			</label>
			<label>Salty
				<input type="radio" 
					name="filter_choice"
					style={{ accentColor: "#EF6079FF" }}
					onChange={()=>this.props.handleSelection('salty')}
					/>
			</label>
			<label>Umami
				<input type="radio" 
					name="filter_choice"
					style={{ accentColor: "#EF6079FF" }}
					onChange={()=>this.props.handleSelection('umami')}
					/>
			</label>
			<label>High Rating
				<input type="radio" 
					name="filter_choice"
					style={{ accentColor: "#EF6079FF" }}
					onChange={()=>this.props.handleSelection('rating')}
					/>
			</label>
		</div>
    )
  }
}
