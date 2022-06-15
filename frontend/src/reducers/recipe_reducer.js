import {
    RECEIVE_RECIPES,
    RECEIVE_RECIPE,
    RECEIVE_USER_RECIPES,
    RECEIVE_NEW_RECIPE,
    RECEIVE_DOTD
} from "../actions/recipe_actions";
import { REMOVE_REVIEW } from "../actions/review_actions";
const RecipesReducer = (
    state = { all: {}, user: {}, new: undefined },
    action
) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_RECIPES:
            newState.all = action.recipes;
            return newState;
        case RECEIVE_RECIPE:
            let all = Object.assign({}, newState.all, action.recipe);
            newState.all = all;
            return newState;
        case RECEIVE_USER_RECIPES:
            newState.user = action.recipes.data;
            return newState;
        case RECEIVE_NEW_RECIPE:
            newState.new = action.recipe.data;
            return newState;
        case RECEIVE_DOTD:
            newState.today = action.recipe.data;
            return newState;
        case REMOVE_REVIEW:
            let recipeArr = newState.all[action.review.data.recipe].reviews
            // console.log('after REMOVE_REVIEW for the Recipe Review Array',newState.all[action.review.data.recipe].reviews)
            recipeArr = recipeArr.filter(review => review._id !== action.review.data._id)
            newState.all[action.review.data.recipe].reviews = recipeArr
            
            return newState
        default:
            return state;
    }
};

export default RecipesReducer;
