import { combineReducers } from 'redux';
import recipes from './recipe_reducer';
import ingredients from "./ingredients_reducer";
import users from "./user_reducer";
const EntitiesReducer = combineReducers({
  recipes,
  ingredients,
  users
});

export default EntitiesReducer;