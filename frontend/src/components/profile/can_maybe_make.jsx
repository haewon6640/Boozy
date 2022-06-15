import React, { Component } from 'react'
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';

export default class CanMaybeMake extends Component {
  constructor(props){
    super(props)
    this.state={
      limit:5
    }
    this.toggleList = this.toggleList.bind(this)
  }
  findDrinks(){
    // let flavor_profile_test = {boozy:4, sweet: 2, sour:4,bitter: 1,salty:3,umami:5, rating:4}
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
      if (data.missing_ing.length > 0 && 
        (recipe.creator_flavor_profile[this.props.filter_choice] >= 3 || this.props.filter_choice === "")
        ) filtered.push(data)
    })
    return filtered.sort(this.sortByMissingIng)
  }

  sortByMissingIng(a,b){
    return a.missing_ing.length > b.missing_ing.length ? 1 : -1
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
          <div className="in-line" onClick={()=>this.props.toggleBarCart("cant_open")}>
            <h2>You can nearly make</h2>
            {!this.props.open && <IoIosArrowBack className='arrow'/>}
            {this.props.open && <IoIosArrowDown className='arrow'/>}
          </div>
          { this.props.open && <div>
            <ul>
              {canMaybeMake.map((dataObj, i)=> ( i < this.state.limit && <li
                onClick={()=>this.props.handleSelection("curr_recipe",dataObj.recipe)} 
                key={i + "canMaybe"} 
              >{dataObj.recipe.name}</li>))}
            </ul>
            {canMaybeMake.length > 5 && this.state.limit === 5 && <button className="btn" onClick={this.toggleList}>(Show More)</button>}
            {canMaybeMake.length > 5 && this.state.limit === 20 && <button className="btn" onClick={this.toggleList}>(Show Less)</button>}
          </div>}
      </div>
    )
  }
}
