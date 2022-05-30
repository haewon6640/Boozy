import {connect} from "react-redux";
import { createRecipe } from "../../actions/recipe_actions";
import RecipeForm from "./recipe_form";
const mSTP = state => ({
    formType: "Submit your Recipe"
});

const mDTP = dispatch => ({
    action: (recipe) => dispatch(createRecipe(recipe))
})

export default connect(mSTP, mDTP)(RecipeForm);