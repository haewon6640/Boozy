import React from "react";
import Autocomplete from "./auto_complete";
import CanMake from "./can_make";
import CanMaybeMake from "./can_mayby_make";
import {AiOutlineCloseCircle} from 'react-icons/ai'; 
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
import BarCartRecipeShow from "./barcart_recipe_show";
import FilterChoice from "./filter_choice";
class BarCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            missing: [],
            barcart_open: false,
            filter_open: false,
            can_open: true,
            cant_open: true,
            curr_recipe: {},
            curr_ingredients: [],
            user: {},
			filter_choice:""
        };
        this.addItem = this.addItem.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.toggleBarCart = this.toggleBarCart.bind(this);
        this.getNeededIngredients = this.getNeededIngredients.bind(this);
		this.handleSelection = this.handleSelection.bind(this);
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
    }

	handleSelection(value){
		console.log("I've changed")
		this.setState({filter_choice:value},()=> console.log(this.state))
	}

    addItem(item) {
        this.props.addIngredients(item);
    }

    toggleBarCart(type) {
        this.setState({[type]: !this.state[type]})
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
        // if (!this.state.barcart_open) {
        //     barcart = (
        //         <button onClick={()=>this.toggleBarCart("barcart_open")} className="btn btn-barcart">
        //             Open Barcart
        //         </button>
        //     )
        // } else {
            barcart = (
                <div className="cart-box">
					<div className="in-line" onClick={()=>this.toggleBarCart("barcart_open")}>
						<h2> Your Bar Cart</h2>
						{!this.state.barcart_open && <IoIosArrowBack className='arrow'/>}
            			{this.state.barcart_open && <IoIosArrowDown className='arrow'/>}
					</div>
					{ this.state.barcart_open && <div>
						<Autocomplete
							className="search-input-web"
							dictionary={dictionary}
							addItem={this.addItem}
						/>
						<ul>
							{this.props.user.shelf !== [] &&
								this.props.user.shelf.map((item) => (
									<li className="bar-items" key={item}>
										{this.props.ingredients[item].name}
									</li>
								))}
						</ul>
					</div>}
                </div>
            )
        // }
        return (
            <div className="webpage">
                <div className="two-col asym">
                    <div className="bar-left">
                        <div className="recipes-possible sticky ">
                        	{barcart}
							<FilterChoice
								handleSelection={this.handleSelection}
								toggleBarCart={this.toggleBarCart}
								filter_open={this.state.filter_open}
							/>
                            <CanMake
								filter_choice={this.state.filter_choice}
                                recipes={this.props.recipes.all}
                                shelf={this.props.user.shelf}
								toggleBarCart={this.toggleBarCart}
								open={this.state.can_open}
                            />
                            <CanMaybeMake
								filter_choice={this.state.filter_choice}
                                recipes={this.props.recipes.all}
                                shelf={this.props.user.shelf}
                                handleHover={this.handleHover}
								toggleBarCart={this.toggleBarCart}
								open={this.state.cant_open}
                            />
                        </div>
                    </div>
                    <div className="bar-right">
                        {console.log(this.state.curr_recipe)}
                        <BarCartRecipeShow 
							recipe={this.state.curr_recipe}
                            ingredients={this.state.curr_ingredients}
                            missing={this.state.missing} 
						/>
                    </div>
                </div>
            </div>
        );
    }
}

export default BarCart;
