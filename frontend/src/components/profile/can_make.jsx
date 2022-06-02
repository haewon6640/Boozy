import React, { Component } from 'react'

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
    let flavor_profile_test = {boozy:4, sweet: 2, sour:4,bitter: 1,salty:3,umami:5, rating:4}
    let shelf = this.props.shelf  //list of ids
    let recipes = Object.values(this.props.recipes) //has ids as ingredients in array

    return recipes.filter(recipe=>(recipe.ingredients.every(ingredient=>shelf.includes(ingredient))) && flavor_profile_test[this.props.filter_choice] >= 3)
  }
  render() {
    let canMake = this.findDrinks()
    return (
      <div className="make-box">
        <h2>You Can Make</h2>
        <ul>
          {canMake.map((recipe, i)=> ( i < this.state.limit && <li key={"canMake" + i}>{recipe.name}</li>))}
        </ul>
        {canMake.length > 5 && this.state.limit === 5 && <button onClick={this.toggleList}>(Show More)</button>}
        {canMake.length > 5 && this.state.limit === 20 && <button onClick={this.toggleList}>(Show Less)</button>}
      </div>
      
    )
  }
}
