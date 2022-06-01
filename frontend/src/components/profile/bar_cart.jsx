import React from "react";
import Autocomplete from "./auto_complete";

class BarCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        }
        this.handleShelf = this.handleShelf.bind(this);
        this.addItem = this.addItem.bind(this)
    }
    componentDidMount() {
        this.props.fetchIngredients();
        this.props.fetchUser();
    }
    handleShelf() {
        this.props.addIngredients(this.state.cart)
            .then(()=>this.setState({cart: []}))
    }
    addItem(item) {
        this.props.addIngredients(item)
    }
    render() {
        if (!this.props.user) {
            return null;
        }
        const dicitonary = Object.values(this.props.ingredients)
        console.log(this.props)
        return (
            <div className="webpage">
              <div className="two-col asym">
                <div className="bar-left">
                  <div className="cart-outer-container">
                    <Autocomplete 
                      className='search-input-web' 
                      dictionary={dicitonary}
                      addItem={this.addItem}
                      />
                    <ul>
                      <div className="barcart-title">Your Bar Cart</div>
                      
                      {this.props.user.shelf !== [] && this.props.user.shelf.map(item=>(
                        <li>{this.props.ingredients[item].name}</li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div className="bar-right">
                  <div className="two-col">
                    <div className="easy-drinqs">easy peasy</div>
                    <div className="hard-drinqs">Quite the Challenge!</div>
                  </div>
                  <div className="missing">missing ingredients</div>
                  <div className="map-container">
                    <img src="https://mikesrpgcenter.com/zelda3/maps/lightworld_large.gif" alt="" />
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default BarCart;
