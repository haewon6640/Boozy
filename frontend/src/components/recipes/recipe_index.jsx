import React from "react";
import RecipeIndexItem from "./recipe_index_item";
import {Link} from "react-router-dom";
class RecipeIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
        };
    }
    componentDidMount() {
        this.props.fetchIngredients();
        this.props.fetchRecipes()
    }
    componentWillReceiveProps(newState) {
        this.setState({recipes: newState.recipes})
    }
    componentDidUpdate(prevProps) {
        if (prevProps.location.search != this.props.location.search) {
            this.props.fetchRecipes();
        }
    }

    render() {
        if (this.state.recipes.length === 0) {
            return (<div>No recipes</div>)
        } else {
            return (
            <div className="webpage">
                <Link className='btn' to="/recipes/new"><span className="">New Recipe</span></Link>
                <ul className="recipe-index-container">
                    {this.state.recipes.map((recipe, idx)=> (
                        <RecipeIndexItem
                            key={recipe._id} 
                            ingredients={this.props.ingredients} 
                            recipe={recipe}
                        />
                    ))}
                </ul>
            </div>
        );
        }
    }
}

export default RecipeIndex;
 