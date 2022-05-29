import * as RecipeApiUtil from "../util/recipe_api_util";

export const RECEIVE_RECIPES = "RECEIVE_RECIPES";
export const RECEIVE_USER_RECIPES = "RECEIVE_USER_RECIPES";
export const RECEIVE_NEW_RECIPE = "RECEIVE_NEW_RECIPE";

export const receiveRecipes = (recipes) => ({
    type: RECEIVE_RECIPES,
    recipes,
});

export const receiveUserRecipes = (recipes) => ({
    type: RECEIVE_USER_RECIPES,
    recipes,
});

export const receiveNewRecipe = (recipe) => ({
    type: RECEIVE_NEW_RECIPE,
    recipe,
});

export const fetchRecipes = () => (dispatch) =>
    RecipeApiUtil.getRecipes()
        .then((recipes) => dispatch(receiveRecipes(recipes)))
        .catch((err) => console.log(err));

export const fetchUserRecipes = (id) => (dispatch) =>
    RecipeApiUtil.getUserRecipes(id)
        .then((recipes) => dispatch(receiveUserRecipes(recipes)))
        .catch((err) => console.log(err));

export const composeRecipe = (data) => (dispatch) =>
    RecipeApiUtil.writeRecipe(data)
        .then((recipe) => dispatch(receiveNewRecipe(recipe)))
        .catch((err) => console.log(err));
