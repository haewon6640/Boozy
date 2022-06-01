import React from "react";
import FilterItem from "./ingredient_filter_item";

export default class RecipeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            ingredients: [], 
            instructions: "",
            additionalInfo: "",
            categories: {
                alcohol: [],
                produce: [],
                mixers: [],
                garnish: []
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    combineCategories(type){
        let cats = [];
        this.props.ingredients.forEach((ingredient) => {
            if (ingredient[category] === type) {
                //may need to push ingredient, to access the whole ingredient
                cats.push(ingredient)
            }
        })
        return cats;
    }

    componentDidMount() {
        this.props.fetchIngredients();
    }

    update(field) {
        return e => (
            this.setState({
                [field]: e.target.value
            })
        )
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.action(this.state)
    }

    addToCart(ing) {
        return (e) => {
            e.preventDefault();
            this.setState({ingredients: this.state.ingredients.concat([ing])})
        }
    }

    render() {
        this.alcoholArray = this.combineCategories("alcohol")
        this.produceArray = this.combineCategories("produce")
        this.mixersArray = this.combineCategories("mixers")
        this.garnishArray = this.combineCategories("garnish")
        return (
            <div className="webpage outer-create-recipe-form">
                {this.props.formType}
                <div className="inner-create-recipe-form">
               
                <form onSubmit={this.handleSubmit} className="create-recipe-form">
                    <input onChange={this.update("name")} type="text" value={this.state.name} placeholder="Recipe Name" />
        
                    <div></div>
                    <div className="ingredient-list">
                        <div className="ingredient-list-title">Ingredients</div>
                        <FilterItem addToCart={this.addToCart} subtitle="Alcohol" array={this.alcoholArray}/>
                        <FilterItem addToCart={this.addToCart} subtitle="Produce" array={this.produceArray}/>
                        <FilterItem addToCart={this.addToCart} subtitle="Mixers" array={this.mixersArray}/>
                        <FilterItem addToCart={this.addToCart} subtitle="Garnish" array={this.garnishArray}/>
                        {/* {"Ingredient List -   "}
                        {this.state.ingredients.map(ingredient=><span >{ingredient.name}  </span>)} */}
                    </div>
                    <div></div>
                    {/* <div>
                        {Object.values(this.props.ingredients).map(ing=>(
                            <span><button className="btn" onClick={this.addToCart(ing)}>Add {ing.name}</button></span>
                        ))}
                    </div> */}
                    <div className="recipe-input-forms">
                        <textarea onChange={this.update("instructions")} value={this.state.instructions} placeholder="Instructions"/>
                        <textarea onChange={this.update("additionalInfo")} value={this.state.additionalInfo} placeholder="Additional Info"/>
                    </div>
                    <button className="btn">Submit</button>
                </form>
                </div>
            </div>
        )
    }
}