import React from "react";

class BarCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        }
        this.handleShelf = this.handleShelf.bind(this);
    }
    componentDidMount() {
        this.props.fetchIngredients();
        this.props.fetchUser();
    }
    handleShelf() {
        this.props.addIngredients(this.state.cart)
            .then(()=>this.setState({cart: []}))
    }
    render() {
        if (!this.props.user) {
            return null;
        }
        return (
            <div className="webpage">
              <div className="two-col asym">
                <div className="bar-left">
                  <div className="cart-outer-container">
                    <input type="text"
                      className='search-input-web'
                      placeholder="Input Mixers"
                      readOnly
                      />
                    <ul>
                      <div className="barcart-title">Your Bar Cart</div>
                      
                      {this.props.user.shelf.map(item=>(
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
                {/* {`${this.props.user.handle}'s Bar Cart`}
                <div>
                {this.props.user.shelf.map(item=>(
                    <span>{this.props.ingredients[item].name}</span>
                ))}
                </div>
                My Cart
                <div>
                    {this.state.cart.map(val=><span>{val.name} </span>)}
                </div>
                {Object.values(this.props.ingredients).map(ing=>(
                    <span><button onClick={()=>this.setState({cart: this.state.cart.concat([ing])})}>Add {ing.name}</button></span>
                ))}

                <br />

                <button onClick={this.handleShelf}>Add Ingredients to Shelf</button> */}
            </div>
        )
    }
}

export default BarCart;
