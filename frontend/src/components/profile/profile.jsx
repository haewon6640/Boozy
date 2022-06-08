import React from "react";
import Boozymap from '../map/map'


class Profile extends React.Component {
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
          return <div className="loading"></div>;
        }
        return (
            <div>
                {`${this.props.user.handle}'s Shelf`}
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

                <button onClick={this.handleShelf}>Add Ingredients to Shelf</button>

            <Boozymap/>

            </div>
        )
    }
}

export default Profile;
