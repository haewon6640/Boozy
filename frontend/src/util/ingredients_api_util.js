import axios from 'axios';

export const getIngredients = () => {
  return axios.get('/api/ingredients')
};

// export const createIngredient
