import axios from 'axios';

export const getUser = (id) => {
  return axios.get(`/api/users/${id}`) 
};

export const addToShelf = (ingredients) => {
    return axios.post('/api/users/shelf', {shelf: ingredients})
}

export const deleteFromShelf = (ingredientId) => {
    return axios.post('/api/users/shelf/delete', {shelfItem: ingredientId})
}