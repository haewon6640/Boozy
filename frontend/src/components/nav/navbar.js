import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div className='nav-right'>
                <Link to={'/profile'}>Profile</Link>
                <button onClick={this.logoutUser}>Logout</button>
                <Link to={'/recipes'}>Recipes</Link>
            </div>
        );
      } else {
        return (
            <div className='nav-right'>
                <Link to={'/signup'}>Signup</Link>
                <Link to={'/login'}>Login</Link>
                <Link to={'/recipes'}>Recipes</Link>
            </div>
        );
      }
  }

  render() {
      return (
        <div className='webpage'>
          <div className='navbar-inner-container'>
              <div className='nav-left'>
                  <img id="logo" src='https://images.squarespace-cdn.com/content/v1/56a01c5f5a56686ee6b460af/1608658525023-M5P08N1CGUQZJTRKSTVB/Summer+Wedding+Signature+Drink+Ideas?format=300w' alt='greyhound'></img>
                  <div className='title'>Boozy</div>
              </div>
              { this.getLinks() }
          </div>
        </div>
      );
  }
}

export default NavBar;