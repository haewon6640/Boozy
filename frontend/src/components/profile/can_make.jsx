import React, { Component } from 'react'
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';

export default class CanMake extends Component {
  constructor(props){
    super(props)
    this.state={
      limit:5
    }
    this.toggleList = this.toggleList.bind(this)
  }

  toggleList(){
    if (this.state.limit === 5) {
      this.setState({limit:20})
    } else {
      this.setState({limit:5})
    }
  }

  findDrinks(){
    let shelf = this.props.shelf  //list of ids
    let recipes = Object.values(this.props.recipes) //has ids as ingredients in array
    
    let flavor_profile_test = {boozy:4, sweet: 2, sour:4,bitter: 1,salty:3,umami:5, rating:4}

    return recipes.filter(recipe=>(recipe.ingredients.every(ingredient=>(shelf.includes(ingredient)|| ingredient === null))) &&
     (flavor_profile_test[this.props.filter_choice] >= 3 || this.props.filter_choice === "")
     )
  }

  render() {
    let canMake = this.findDrinks()
    return (
      <div className="make-box">
          <div className="in-line"onClick={()=>this.props.toggleBarCart("can_open")}>
            <h2 >You can make</h2>
            {!this.props.open && <IoIosArrowBack className='arrow'/>}
            {this.props.open && <IoIosArrowDown className='arrow'/>}
          </div>
        {this.props.open && <div>
            <ul>
              {canMake.map((recipe, i)=> ( i < this.state.limit && <li 
			    onClick={()=>this.props.handleHover(recipe, [], recipe.ingredients)} 
			  	key={"canMake" + i}>{recipe.name}</li>))}
            </ul>
            {canMake.length > 5 && this.state.limit === 5 && <button onClick={this.toggleList}>(Show More)</button>}
            {canMake.length > 5 && this.state.limit === 20 && <button onClick={this.toggleList}>(Show Less)</button>}
          </div>}
      </div>
    )
  }
}
