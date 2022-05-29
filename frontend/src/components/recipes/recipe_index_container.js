import {connect} from "react-redux";
import { fetchRecipes } from "../../actions/recipe_actions";
import RecipeIndex from "./recipe_index";

const mSTP = (state) => {
    return {
        recipes: Object.values(state.entities.recipes.all)
    }
}

const mDTP = dispatch => {
    return {
        fetchRecipes: () => dispatch(fetchRecipes())
    }
}

export default connect(mSTP, mDTP)(RecipeIndex);