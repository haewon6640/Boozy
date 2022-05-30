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

    render() {
        if (this.state.recipes.length === 0) {
            return (<div>No recipes</div>)
        } else {
            return (
            <div>
                <Link to="/recipes/new">New Recipe</Link>
                <ul>
                    {this.state.recipes.map((recipe, idx)=> (
                        <RecipeIndexItem key={recipe._id} ingredients={this.props.ingredients} recipe={recipe} />
                    ))}
                </ul>
            </div>
        );
        }
    }
}

export default RecipeIndex;
