
import React from "react"

class Autocomplete extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputVal: ""
    };
    this.updateInput = this.updateInput.bind(this)
  }

  updateInput(event){
    this.setState({inputVal:event.target.value}) 
  }

  render(){
    let matches = <ul>
      {this.props.dictionary.filter((str)=> str.includes(this.state.inputVal)).map((str)=> {
        return <li key={str}>{str}</li>
      })}
      </ul>
    return (
      <div className="autocomplete">
        <input type="text" onChange={this.updateInput}/>
        { (this.state.inputVal !== "")? matches : null}
      </div>
    )
  }
}

export default Autocomplete;