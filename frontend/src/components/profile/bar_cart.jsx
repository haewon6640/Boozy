import React from "react";
import Autocomplete from "./auto_complete";
import CanMake from "./can_make";
import CanMaybeMake from "./can_mayby_make";
import {AiOutlineCloseCircle} from 'react-icons/ai'; 
import BarCartRecipeShow from "./barcart_recipe_show";
class BarCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            missing: [],
            barcart_modal_open: false,
            curr_recipe: {},
            curr_ingredients: [],
            user: {}

        };
        // this.handleShelf = this.handleShelf.bind(this);
        this.addItem = this.addItem.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.toggleBarCart = this.toggleBarCart.bind(this);
        this.getNeededIngredients = this.getNeededIngredients.bind(this);
    }
    componentDidMount() {
        this.props.fetchIngredients();
        this.props.fetchRecipes();
        this.props.fetchUser()
            .then(()=>this.setState({user: this.props.user}));
    }
    getNeededIngredients(ingredientList) {
        return Object.values(this.props.ingredients).filter(ing=>
            ingredientList.includes(ing._id))
    }
    handleHover(recipe, missing, ingredients) {

        this.setState({ curr_recipe: recipe, missing: this.getNeededIngredients(missing, missing), curr_ingredients: this.getNeededIngredients(ingredients, missing) });
        // console.log(missing)
    }

    // handleShelf() {
    //     this.props.addIngredients(this.state.cart)
    //         .then(()=>this.setState({cart: []}))
    // }
    addItem(item) {
        this.props.addIngredients(item);
    }
    toggleBarCart(e) {
        this.setState({barcart_modal_open: !this.state.barcart_modal_open})
    }
    render() {
        if (Object.values(this.state.user).length === 0) {
            return null;
        }
        if (Object.values(this.props.ingredients).length === 0) {
            return null;
        }
        let barcart = "";
        const dictionary = Object.values(this.props.ingredients);
        if (!this.state.barcart_modal_open) {
            barcart = (
                <button onClick={this.toggleBarCart} className="btn btn-barcart">
                    Open Barcart
                </button>
            )
        } else {
            barcart = (
                <div className="cart-outer-container">
                    <AiOutlineCloseCircle size={30} onClick={this.toggleBarCart} className="close-barcart"/>
                    <Autocomplete
                        className="search-input-web"
                        dictionary={dictionary}
                        addItem={this.addItem}
                    />
                    <ul>
                        <div className="barcart-title">
                            Your Bar Cart
                        </div>
                        {this.props.user.shelf !== [] &&
                            this.props.user.shelf.map((item) => (
                                <li className="bar-items" key={item}>
                                    {this.props.ingredients[item].name}
                                </li>
                            ))}
                    </ul>
                </div>
            )
        }
        return (
            <div className="webpage">
                <div className="two-col asym">
                    <div className="bar-left">
                        {barcart}
                        <div className="recipes-possible">
                            <CanMake
                                recipes={this.props.recipes.all}
                                shelf={this.props.user.shelf}
                            />
                            <CanMaybeMake
                                recipes={this.props.recipes.all}
                                shelf={this.props.user.shelf}
                                handleHover={this.handleHover}
                            />
                        </div>
                    </div>
                    <div className="bar-right">
                        {console.log(this.state.curr_recipe)}
                        <BarCartRecipeShow recipe={this.state.curr_recipe}
                                            ingredients={this.state.curr_ingredients}
                                            missing={this.state.missing} />
                        {/* <div className="two-col">
                            <div className="missing">
                                <h2>Get this stuff, bro</h2>
                                <ul>
                                    {this.state.missing.length > 0 &&
                                        this.state.missing.map((ingId, i) => (
                                            <li key={i + "missing"}>
                                                {
                                                    this.props.ingredients[
                                                        ingId
                                                    ].name
                                                }
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default BarCart;
