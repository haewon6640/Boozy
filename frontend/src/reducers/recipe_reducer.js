import {
    RECEIVE_RECIPES,
    RECEIVE_RECIPE,
    RECEIVE_USER_RECIPES,
    RECEIVE_NEW_RECIPE,
    RECEIVE_DOTD
} from "../actions/recipe_actions";

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
        default:
            return state;
    }
};

export default RecipesReducer;
