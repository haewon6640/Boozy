import * as RecipeApiUtil from "../util/recipe_api_util";

export const RECEIVE_RECIPES = "RECEIVE_RECIPES";
export const RECEIVE_RECIPE = "RECEIVE_RECIPE";
export const RECEIVE_USER_RECIPES = "RECEIVE_USER_RECIPES";
export const RECEIVE_NEW_RECIPE = "RECEIVE_NEW_RECIPE";

export const receiveRecipes = (recipes) => ({
    type: RECEIVE_RECIPES,
    recipes
});
export const receiveRecipe = (res) => ({
    type: RECEIVE_RECIPE,
    recipe: res.recipe,
    ingredients: res.ingredients,
    reviews: res.reviews
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
        .then((recipes) => dispatch(receiveRecipes(recipes.data)))
        .catch((err) => console.log(err));

export const fetchRecipe = (id) => (dispatch) =>
    RecipeApiUtil.getRecipe(id)
        .then((res) => dispatch(receiveRecipe(res.data)))
        .catch((err) => console.log(err));

export const fetchUserRecipes = (id) => (dispatch) =>
    RecipeApiUtil.getUserRecipes(id)
        .then((recipes) => dispatch(receiveUserRecipes(recipes)))
        .catch((err) => console.log(err));

export const createRecipe = (data) => (dispatch) =>
    RecipeApiUtil.createRecipe(data)
        .then((recipe) => dispatch(receiveNewRecipe(recipe)))
        .catch((err) => {throw "err"});
