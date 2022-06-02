import React from "react"

class Autocomplete extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputVal: ""
    };
    this.updateInput = this.updateInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  findIngredient(testIng){
    let ingredients = this.props.dictionary
    let arr = Object.values(ingredients)
    let ingArr = arr.filter((ing)=> (ing.name === testIng))
    return(ingArr)
  }

  returnFirstIngredient(testIng){
    let ingredients = this.props.dictionary
    let arr = Object.values(ingredients)
    let ingArr = arr.filter((ing)=> (ing.name.slice(0,testIng.length) === testIng))
    ingArr = [ingArr[0]]
    return(ingArr)
  }

  updateInput(event){
    this.setState({inputVal:event.target.value}) 
  }

  handleSubmit(e){
    e.preventDefault()
    let ing = this.findIngredient(this.state.inputVal)
    if(ing.length > 0) {
      this.props.addItem(ing)
      this.setState({inputVal: ""})
    } else {
      ing = this.returnFirstIngredient(this.state.inputVal)
      this.props.addItem(ing)
      this.setState({inputVal: ""})
    }
  }
  handleClick(name){
    let ing = this.findIngredient(name)
    this.props.addItem(ing)
    this.setState({inputVal: ""})
  }
  
  render(){
    let matches = <div>
      {this.props.dictionary.filter((ing)=> ing.name.slice(0, this.state.inputVal.length) === this.state.inputVal).map((ing)=> {
        return <li 
        className="autocomplete-res"
        key={ing.name}
        onClick={()=>this.handleClick(ing.name)}
        >{ing.name}</li>
      })}
      </div>
      return (
        <div className="autocomplete">
        <form  onSubmit={this.handleSubmit}>
          <input value={this.state.inputVal} type="text" onChange={this.updateInput}/>
        </form>
        <ul className="dropdown-ing">
        { (this.state.inputVal !== "")? matches : null}
        </ul>
      </div>
    )
  }
}

export default Autocomplete;