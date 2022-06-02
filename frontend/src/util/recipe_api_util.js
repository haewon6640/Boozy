import axios from 'axios';

export const getRecipes = () => {
  return axios.get('/api/recipes')
};

export const getRecipe = (id) => {
  return axios.get(`/api/recipes/${id}`)
};

export const getUserRecipes = id => {
  return axios.get(`/api/recipes/user/${id}`)
};

export const createRecipe = data => {
  return axios.post('/api/recipes/', data)
}