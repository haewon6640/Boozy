import { combineReducers } from 'redux';
import recipes from './recipe_reducer';
const EntitiesReducer = combineReducers({
  recipes
});

export default EntitiesReducer;