import {connect} from "react-redux";
import { updateRecipe, fetchRecipe } from "../../actions/recipe_actions";
import {fetchIngredients} from "../../actions/ingredient_actions";
import RecipeForm from "./recipe_form";
const mSTP = (state,ownProps) => ({
    recipe: state.entities.recipes.all[ownProps.match.params.id],
    ingredients: Object.values(state.entities.ingredients),
    formType: "Edit your recipe"
});

const mDTP = (dispatch,ownProps) => ({
    action: (recipe) => dispatch(updateRecipe(recipe)),
    fetchRecipe: () => dispatch(fetchRecipe(ownProps.match.params.id)),
    fetchIngredients: () => dispatch(fetchIngredients()),
})

export default connect(mSTP, mDTP)(RecipeForm);