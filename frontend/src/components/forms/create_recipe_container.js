import {connect} from "react-redux";
import { createRecipe } from "../../actions/recipe_actions";
import {fetchIngredients} from "../../actions/ingredient_actions";
import RecipeForm from "./recipe_form";
const mSTP = state => ({
    ingredients: Object.values(state.entities.ingredients),
    formType: "Submit your Recipe"
});

const mDTP = dispatch => ({
    action: (recipe) => dispatch(createRecipe(recipe)),
    fetchIngredients: () => dispatch(fetchIngredients()),
})

export default connect(mSTP, mDTP)(RecipeForm);