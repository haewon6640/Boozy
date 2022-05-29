import { connect } from 'react-redux';
import Profile from './profile';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchUserTweets: id => dispatch(fetchUserTweets(id))
//   };
// };

export default connect(mapStateToProps)(Profile);
