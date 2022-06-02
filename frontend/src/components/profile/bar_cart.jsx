import React from "react";
import Autocomplete from "./auto_complete";
import CanMake from "./can_make";
import CanMaybeMake from "./can_mayby_make";

class BarCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            missing: []
        }
        // this.handleShelf = this.handleShelf.bind(this);
        this.addItem = this.addItem.bind(this)
		this.handleMissing = this.handleMissing.bind(this)
    }
    componentDidMount() {
        this.props.fetchIngredients();
        this.props.fetchUser();
        this.props.fetchRecipes();
    }

	handleMissing(missing){
		this.setState({missing:missing})
		// console.log(missing)
	}

    // handleShelf() {
    //     this.props.addIngredients(this.state.cart)
    //         .then(()=>this.setState({cart: []}))
    // }
    addItem(item) {
        this.props.addIngredients(item)
    }
    render() {
        if (!this.props.user) {
            return null;
        }
        const dicitonary = Object.values(this.props.ingredients)
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
                        <li className="bar-items" key={item}>{this.props.ingredients[item].name}</li>
                        ))}

                    </ul>
                  </div>
                </div>
                <div className="bar-right">
                  <div className="two-col">
                    <CanMake 
						
						recipes={this.props.recipes.all} 
						shelf={this.props.user.shelf}
                    />
                    <CanMaybeMake
						
						recipes={this.props.recipes.all} 
						shelf={this.props.user.shelf}
						handleMissing={this.handleMissing}
                    />
                  </div>
                  <div className="two-col">
                    <div className="missing">
					<h2>Get this stuff, bro</h2>
					<ul>
						{this.state.missing.length>0 && this.state.missing.map((ingId, i)=> (<li
						 key={i + "missing"}>{this.props.ingredients[ingId].name}</li>))}
					</ul>
					</div>
                    <div className="map-container">
                      <img src="https://mikesrpgcenter.com/zelda3/maps/lightworld_large.gif" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default BarCart;
