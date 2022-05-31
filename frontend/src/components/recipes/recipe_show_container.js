import {connect} from "react-redux";
// import { fetchRecipes } from "../../actions/recipe_actions";
// import { fetchIngredients } from "../../actions/ingredient_actions";
import RecipeShow from "./recipe_show";

const mSTP = (state) => {
    return {
        // recipes: Object.values(state.entities.recipes.all),
        // ingredients: state.entities.ingredients
    }
}

const mDTP = dispatch => {
    return {
        // fetchRecipes: () => dispatch(fetchRecipes()),
        // fetchIngredients: () => dispatch(fetchIngredients())
    }
}

export default connect(mSTP, mDTP)(RecipeShow);