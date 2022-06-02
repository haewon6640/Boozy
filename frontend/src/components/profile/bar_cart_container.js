import { connect } from 'react-redux';
import BarCart from './bar_cart';
import jwt_decode from 'jwt-decode';
import { fetchIngredients } from '../../actions/ingredient_actions';
import { addShelf, fetchUser } from '../../actions/user_actions';
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
    fetchRecipes: ()=>dispatch(fetchRecipes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarCart);
