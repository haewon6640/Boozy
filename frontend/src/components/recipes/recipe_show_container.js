import {connect} from "react-redux";
import { closeModal, openModal } from "../../actions/modal_actions";
import { fetchRecipe, deleteRecipe } from "../../actions/recipe_actions";
import { createReview, fetchReviews } from "../../actions/review_actions";
import RecipeShow from "./recipe_show";

const mSTP = (state, ownProps) => {
    // console.log('recipe show container props:', state)
    return {
        recipe: state.entities.recipes.all[ownProps.match.params.id],
        ingredients: Object.values(state.entities.ingredients),
        reviews: Object.values(state.entities.reviews),
        user: state.session.user,
        modal: state.ui.modal
    }
}

const mDTP = (dispatch, ownProps) => {
    return {
        fetchRecipe: () => dispatch(fetchRecipe(ownProps.match.params.id)),
        createReview: (review) => dispatch(createReview(review)),
        deleteRecipe: () => dispatch(deleteRecipe(ownProps.match.params.id)),
        openModal: (modal) => dispatch(openModal(modal)),
        closeModal: () => dispatch(closeModal()),
        fetchReviews: () => dispatch(fetchReviews())
    }
}

export default connect(mSTP, mDTP)(RecipeShow);