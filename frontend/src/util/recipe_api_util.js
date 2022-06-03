import axios from "axios";

export const getRecipes = (searchString) => {
    return axios.get(`/api/recipes/?search=${searchString}`)
}

export const getRecipe = (id) => {
    return axios.get(`/api/recipes/${id}`);
};

export const getDrinkOfTheDay = () => {
    return axios.get('/api/recipes/random')
}
export const getUserRecipes = (id) => {
    return axios.get(`/api/recipes/user/${id}`);
};

export const createRecipe = (data) => {
    return axios.post("/api/recipes/", data);
};

export const updateRecipe =(recipe) => {
    return axios.post(`/api/recipes/${recipe._id}/update`);
}

export const deleteRecipe = (recipeId) => {
    return axios.post(`/api/recipes/${recipeId}/delete`);
}