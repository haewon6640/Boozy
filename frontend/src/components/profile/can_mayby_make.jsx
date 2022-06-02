import React, { Component } from 'react'

export default class CanMaybeMake extends Component {
  constructor(props){
    super(props)
    this.state={
      limit:5
    }
    this.toggleList = this.toggleList.bind(this)
  }
  findDrinks(){
    let shelf = this.props.shelf  //list of ids
    let recipes = Object.values(this.props.recipes) //has ids as ingredients in array
    let filtered=[];
    recipes.forEach((recipe)=>{
      let data = {
        recipe:recipe,
        missing_ing:[]
      };
      recipe.ingredients.forEach((ingId)=> {
        if(!shelf.includes(ingId)) {
          data.missing_ing.push(ingId)
        }
      })
      if (data.missing_ing.length > 0) filtered.push(data)
    })
    return filtered.sort(this.sortByMissingIng)
  }

  sortByMissingIng(a,b){
    return a.missing_ing.length > b.missing_ing.length ? 1 : -1
  }

  test(thing){
    console.log(thing)
  }

  toggleList(){
    if (this.state.limit === 5) {
      this.setState({limit:20})
    } else {
      this.setState({limit:5})
    }
  }

  render() {
    let canMaybeMake = this.findDrinks()
    return (
      <div className="make-box"> 
        <h2>You might try these, bro</h2>
        <ul>
          {canMaybeMake.map((dataObj, i)=> ( i < this.state.limit && <li
            onClick={()=>this.props.handleMissing(dataObj.missing_ing)} 
            key={i + "canMaybe"} 
          >{dataObj.recipe.name}</li>))}
        </ul>
        {canMaybeMake.length > 5 && this.state.limit === 5 && <button onClick={this.toggleList}>(Show More)</button>}
        {canMaybeMake.length > 5 && this.state.limit === 20 && <button onClick={this.toggleList}>(Show Less)</button>}
      </div>
    )
  }
}
