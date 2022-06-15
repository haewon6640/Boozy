import * as RecipeApiUtil from "../util/recipe_api_util";

export const RECEIVE_RECIPES = "RECEIVE_RECIPES";
export const RECEIVE_RECIPE = "RECEIVE_RECIPE";
export const RECEIVE_USER_RECIPES = "RECEIVE_USER_RECIPES";
export const RECEIVE_NEW_RECIPE = "RECEIVE_NEW_RECIPE";
export const REMOVE_RECIPE = "REMOVE_RECIPE";
export const RECEIVE_DOTD = "RECEIVE_DOTD";
export const receiveRecipes = (recipes) => ({
    type: RECEIVE_RECIPES,
    recipes
});

export const receiveDOTD = (recipe) => ({
    type: RECEIVE_DOTD,
    recipe
})
const removeRecipe = (recipeId) => ({
    type: REMOVE_RECIPE,
    recipeId
})
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

export const fetchRecipes = (searchString) => (dispatch) => {
    console.log(searchString);
    searchString = searchString ? searchString : "";
    return RecipeApiUtil.getRecipes(searchString)
        .then((recipes) => dispatch(receiveRecipes(recipes.data)))
        .catch((err) => console.log(err));
}
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
        .then((recipe) => dispatch(receiveRecipe(recipe)))
        .catch((err) => {throw "err"});

export const updateRecipe = (recipe) => (dispatch) => 
    RecipeApiUtil.updateRecipe(recipe)
        .then((recipe)=> dispatch(receiveRecipe(recipe)))
        .catch(err=>{throw "err"});

export const deleteRecipe = (recipeId) => dispatch =>
    RecipeApiUtil.deleteRecipe(recipeId)
        .then(()=>dispatch(removeRecipe(recipeId)))
        .catch(err=>{throw "err"});

export const fetchDrinkOfTheDay = () => dispatch =>
    RecipeApiUtil.getDrinkOfTheDay()
        .then(recipe =>dispatch(receiveDOTD(recipe)))