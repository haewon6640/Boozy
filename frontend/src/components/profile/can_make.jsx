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
    
    let filtered = recipes.filter(recipe=>(recipe.ingredients.every(ingredient=>(shelf.includes(ingredient)|| ingredient === null))) &&
     (recipe.avg_rating[this.props.filter_choice] >= 3 || this.props.filter_choice === "")
     )
     if (filtered.length > 0) {
       let data = {
         recipe:filtered[0],
         ingredients:filtered[0].ingredients
       }
  
       this.props.autoPopulate(data)
     }
     return filtered
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
