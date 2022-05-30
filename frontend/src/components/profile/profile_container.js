import { connect } from 'react-redux';
import Profile from './profile';
import jwt_decode from 'jwt-decode';
import { fetchIngredients } from '../../actions/ingredient_actions';
import { addShelf, fetchUser } from '../../actions/user_actions';
const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    ingredients: state.entities.ingredients,
    user: state.entities.users[state.session.user.id]
    // user: state.entities.users[]
  };
};

const mapDispatchToProps = dispatch => {
  const decodedUser = jwt_decode(localStorage.jwtToken);
  return {
    fetchIngredients: () => dispatch(fetchIngredients()),
    fetchUser: () => dispatch(fetchUser(decodedUser.id)),
    addIngredients: (ingredients) =>dispatch(addShelf(ingredients))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
