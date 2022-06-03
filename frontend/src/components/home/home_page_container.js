import {connect} from "react-redux";
import HomePage from "./home_page";
import { fetchDrinkOfTheDay, fetchRecipes } from "../../actions/recipe_actions";
import {fetchReviews} from "../../actions/review_actions";
const mSTP = state => ({
    dotd: state.entities.recipes.today,
    reviews: Object.values(state.entities.reviews),
    recipes: Object.values(state.entities.recipes.all)
})

const mDTP = dispatch => ({
    fetchDrinkOfTheDay: () => dispatch(fetchDrinkOfTheDay()),
    fetchReviews: ()=> dispatch(fetchReviews()),
    fetchRecipes: () => dispatch(fetchRecipes())
})

export default connect(mSTP, mDTP)(HomePage);