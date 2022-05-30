import {connect} from "react-redux";
import { fetchRecipes } from "../../actions/recipe_actions";
import { fetchIngredients } from "../../actions/ingredient_actions";
import RecipeIndex from "./recipe_index";

const mSTP = (state) => {
    return {
        recipes: Object.values(state.entities.recipes.all),
        ingredients: state.entities.ingredients
    }
}

const mDTP = dispatch => {
    return {
        fetchRecipes: () => dispatch(fetchRecipes()),
        fetchIngredients: () => dispatch(fetchIngredients())
    }
}

export default connect(mSTP, mDTP)(RecipeIndex);