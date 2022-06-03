import { connect } from 'react-redux';
import BarCart from './bar_cart';
import jwt_decode from 'jwt-decode';
import { fetchIngredients } from '../../actions/ingredient_actions';
import { addShelf, deleteFromShelf, fetchUser } from '../../actions/user_actions';
import { fetchRecipes } from '../../actions/recipe_actions';
const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    ingredients: state.entities.ingredients,
    user: state.entities.users[state.session.user.id],
    recipes: state.entities.recipes
    // user: state.entities.users[]
  };
};

const mapDispatchToProps = dispatch => {
  const decodedUser = jwt_decode(localStorage.jwtToken);
  return {
    fetchIngredients: () => dispatch(fetchIngredients()),
    fetchUser: () => dispatch(fetchUser(decodedUser.id)),
    addIngredients: (ingredients) =>dispatch(addShelf(ingredients)),
    fetchRecipes: ()=>dispatch(fetchRecipes()),
    deleteFromShelf: (ingredientId, currUserId)=>dispatch(deleteFromShelf(ingredientId, decodedUser.id)) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarCart);
