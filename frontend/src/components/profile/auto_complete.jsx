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

  updateInput(event){
    this.setState({inputVal:event.target.value}) 
  }

  handleSubmit(e){
    e.preventDefault()
    let ing = this.findIngredient(this.state.inputVal)
    if(ing.length > 0) {
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
    let matches = <ul className="dropdown-ing">
      {this.props.dictionary.filter((ing)=> ing.name.includes(this.state.inputVal)).map((ing)=> {
        return <li 
        key={ing.id}
        onClick={()=>this.handleClick(ing.name)}
        >{ing.name}</li>
      })}
      </ul>
    return (
      <div className="autocomplete">
        <form  onSubmit={this.handleSubmit}>
          <input value={this.state.inputVal} type="text" onChange={this.updateInput}/>
        </form>
        { (this.state.inputVal !== "")? matches : null}
      </div>
    )
  }
}

export default Autocomplete;