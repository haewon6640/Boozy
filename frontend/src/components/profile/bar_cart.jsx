import React from "react";
import Autocomplete from "./auto_complete";
import CanMake from "./can_make";
import CanMaybeMake from "./can_maybe_make";
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
import BarCartRecipeShow from "./barcart_recipe_show";
import FilterChoice from "./filter_choice";
import Shelf from "./shelf";
class BarCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			// booleans to control accordian
			barcart_open: true,
            filter_open: false,
            can_open: true,
            cant_open: true,
			// to controle what is seen in recipe show
            curr_recipe: {},
            // curr_ingredients: [],
            // missing: [],
            user: {},
			filter_choice:"",
			can_make:[]
        };
        this.addItem = this.addItem.bind(this);
        // this.showRecipe = this.showRecipe.bind(this);
        this.toggleBarCart = this.toggleBarCart.bind(this);
        // this.getNeededIngredients = this.getNeededIngredients.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.autoPopulate = this.autoPopulate.bind(this)
		this.findCanDrinks = this.findCanDrinks.bind(this)
    }
    componentDidMount() {
        this.props.fetchIngredients();
        this.props.fetchRecipes();
        this.props.fetchUser()
            .then(()=>this.setState({user: this.props.user}));
		this.findCanDrinks()
		this.autoPopulate()
    }
    // getNeededIngredients(ingredientList) {
    // 	// if (ingredientList) {
    //     // 	return Object.values(this.props.ingredients).filter(ing=>
    //     //   	ingredientList.includes(ing._id))
    // 	// }
	// }

	componentDidUpdate(prevProps){
		console.log(prevProps)
		// if(!prevProps.user) {
		// 	this.props.fetchIngredients();
		// 	this.props.fetchRecipes();
		// 	this.props.fetchUser()
		// 		.then(()=>this.setState({user: this.props.user}));
		// 	this.findCanDrinks()
		// 	this.autoPopulate()
		// }
	}

	findCanDrinks = ()=>{   
		let canMake = Object.values(this.props.recipes.all).filter(recipe=>(
			recipe.ingredients.every(ingredient=>(
				this.props.user.shelf.includes(ingredient)|| ingredient === null))) &&
				(recipe.avg_rating[this.state.filter_choice] >= 3 || this.state.filter_choice === "")
		)
		this.setState({can_make:canMake})
		console.log() // don't delete this
	}

    autoPopulate(){
		if (
			this.state.can_make.length > 0 && 
			Object.values(this.state.curr_recipe).length === 0
		){
			this.setState({
				first:false, 
				curr_recipe:this.state.can_make[0]
			})
		}
    }

    // showRecipe(recipe, missing, ingredients) {
    //     this.setState({ 
	// 		curr_recipe: recipe, 
	// 		missing: this.getNeededIngredients(missing, missing), 
	// 		curr_ingredients: this.getNeededIngredients(ingredients, missing) 
	// 	});
    // }

	handleSelection(type, value){
		this.setState({[type]:value})
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
        barcart = (
            <div className="cart-box">
                <div className="in-line" onClick={()=>this.toggleBarCart("barcart_open")}>
                    <h2> Your Bar Cart</h2>
                    {!this.state.barcart_open && <IoIosArrowBack className='arrow'/>}
                    {this.state.barcart_open && <IoIosArrowDown className='arrow'/>}
                </div>
                {this.state.barcart_open && <div>
                    <Autocomplete
                        className="search-input-web"
                        dictionary={dictionary}
                        addItem={this.addItem}
					/>
					{this.props.user.shelf !== [] && 
					<Shelf
						user={this.props.user}
						ingredients={this.props.ingredients}
						remove={this.props.deleteFromShelf}
						fetchUser={this.props.fetchUser}
						findCanDrinks={this.findCanDrinks}
					/>}

                </div>}
            </div>
        )

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
								handleSelection={this.handleSelection}
								open={this.state.can_open}
								autoPopulate={this.autoPopulate}
								drinks={this.state.can_make}
								toggleBarCart={this.toggleBarCart}
                            />
                            <CanMaybeMake
								filter_choice={this.state.filter_choice}
                                recipes={this.props.recipes.all}
                                shelf={this.props.user.shelf}
								toggleBarCart={this.toggleBarCart}
								open={this.state.cant_open}
								handleSelection={this.handleSelection}
                            />
                        </div>
                    </div>
                    <div className="bar-right">
                        <BarCartRecipeShow 
							recipe={this.state.curr_recipe}
							shelf={this.state.user.shelf}
							showRecipe={this.showRecipe}
							ingredients={this.props.ingredients}
							handleSelection={this.handleSelection}
						/>
                    </div>
                </div>
            </div>
        );
    }
}

export default BarCart;
