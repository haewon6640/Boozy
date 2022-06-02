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
    let shelf = this.props.shelf  //list of ids
    let recipes = Object.values(this.props.recipes) //has ids as ingredients in array
    return recipes.filter(recipe=>recipe.ingredients.every(ingredient=>shelf.includes(ingredient)))
    // let filtered=[];
    // recipes.forEach((recipe)=>{
    //   let count = 0;
    //   recipe.ingredients.forEach((ingId)=> {
    //     // let thing = this.props.ingredients[ingId]
    //     // if (this.props.ingredients[ingId]) console.log(thing.name)
    //     shelf.forEach((ing2Id)=> {
    //       if (ing2Id === ingId){
    //         count ++
    //         // console.log("its a match")
    //         // if (this.props.ingredients[ingId]) console.log(this.props.ingredients[ingId].name)
    //         // if (this.props.ingredients[ing2Id]) console.log(this.props.ingredients[ing2Id].name)
    //         // console.log("its a match")
    //       } else {
    //         // console.log("its not a match")
    //         // if (this.props.ingredients[ingId]) console.log(ingId === ing2Id)
    //         // if (this.props.ingredients[ing2Id]) console.log(this.props.ingredients[ing2Id])
    //       }
    //     })

    //   })
    //   if (count === recipe.ingredients.length) filtered.push(recipe)
    //   console.log(recipe)
    //   console.log(count)

    // })
    // return filtered
  }
  render() {
    let canMake = this.findDrinks()
    return (
      <div className="make-box">
        <h2>You can def Makes these, bro</h2>
        <ul>
          {canMake.map((recipe, i)=> ( i < this.state.limit && <li key={"canMake" + i}>{recipe.name}</li>))}
        </ul>
        {canMake.length > 5 && this.state.limit === 5 && <button onClick={this.toggleList}>(Show More)</button>}
        {canMake.length > 5 && this.state.limit === 20 && <button onClick={this.toggleList}>(Show Less)</button>}
      </div>
      
    )
  }
}
