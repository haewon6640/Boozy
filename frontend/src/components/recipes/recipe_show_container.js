import {connect} from "react-redux";
import { fetchRecipe } from "../../actions/recipe_actions";
import RecipeShow from "./recipe_show";

const mSTP = (state, ownProps) => {
    return {
        recipe: state.entities.recipes.all[ownProps.match.params.id],
        ingredients: Object.values(state.entities.ingredients),
        reviews: Object.values(state.entities.reviews)
    }
}

const mDTP = (dispatch, ownProps) => {
    return {
        fetchRecipe: () => dispatch(fetchRecipe(ownProps.match.params.id))
    }
}

export default connect(mSTP, mDTP)(RecipeShow);