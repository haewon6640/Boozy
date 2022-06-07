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
			shelf_open: true,
            filter_open: false,
            can_open: true,
            cant_open: true,
			// to control what is seen in recipe show
            curr_recipe: {},
            user: {},
			filter_choice:"",
			can_make:[],
			loading: true
        };
        this.addItem = this.addItem.bind(this);
        this.toggleBarCart = this.toggleBarCart.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.autoPopulate = this.autoPopulate.bind(this)
		this.findCanDrinks = this.findCanDrinks.bind(this)
    }
    componentDidMount() {
		console.log("the component mounted")
		this.props.fetchUser().then(() => {
        this.props.fetchIngredients().then(()=>this.setState({loading:false}));
        this.props.fetchRecipes().then(this.findCanDrinks);
      })
    }

    getStarted(){
        this.findCanDrinks()
		this.autoPopulate()
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
        if (this.state.loading) {
            return null;
        }
        let shelf = "";
        const dictionary = Object.values(this.props.ingredients);
        shelf = (
            <div className="cart-box">
                <div className="in-line" onClick={()=>this.toggleBarCart("shelf_open")}>
                    <h2>Your Shelf</h2>
                    {!this.state.shelf_open && <IoIosArrowBack className='arrow'/>}
                    {this.state.shelf_open && <IoIosArrowDown className='arrow'/>}
                </div>
                {this.state.shelf_open && <div>
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
                            {shelf}
                        </div>
                    </div>
                    <div className="bar-right">
                        <BarCartRecipeShow 
							recipe={this.state.curr_recipe}
							shelf={this.props.user.shelf}
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
