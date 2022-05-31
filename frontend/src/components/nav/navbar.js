import React from 'react';
// import { Link } from 'react-router-dom'
import { BsPersonFill } from 'react-icons/bs';
import { GiMartini } from 'react-icons/gi';

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
				<a className='icon-and-title' href={'/#/profile'}>
					<BsPersonFill className='ico'/>
					<div>Profile</div>
				</a>
				<a className='icon-and-title' href={'/#/recipes'}>
					<GiMartini className='ico'/>
					<div>Recipes</div>
              	</a>
                <button className='icon-and-title' onClick={this.logoutUser}>Logout</button>
            </div>
        );
      } else {
        return (
            <div className='nav-right' >
              	<a className='icon-and-title' href={'/#/signup'}>
                	<BsPersonFill className='ico'/>
                	<div>Signup</div>
              	</a>
              	<a className='icon-and-title' href={'/#/login'}>
                	<BsPersonFill className='ico'/>
                	<div>Login</div>
				</a>
				<a className='icon-and-title' href={'/#/recipes'}>
					<GiMartini className='ico'/>
					<div>Recipes</div>
				</a>
            </div>
        );
      }
  }

  render() {
      return (
        <div className='nav-outer-container'>
          <div className='webpage nav-bar-flex'>
            <div className='navbar-inner-container'>
                <div className='nav-left'>
                    <a className='nav-logo' href={'/#/'}>
                        <img id="logo" src='https://images.squarespace-cdn.com/content/v1/56a01c5f5a56686ee6b460af/1608658525023-M5P08N1CGUQZJTRKSTVB/Summer+Wedding+Signature+Drink+Ideas?format=300w' alt='greyhound'></img>
                        <span className='title'>Boozy</span>
                    </a>
                </div>
                {/* <form> */}
					<input type="text"
						className='search-input-web'
						placeholder="Find your next cocktail"
						readOnly
						/>
                {/* </form> */}
                { this.getLinks() }
            </div>
			<input type="text"
						className='search-input-phone'
						placeholder="Find your next cocktail"
						readOnly
						/>
          </div>
        </div>
      );
  }
}

export default NavBar;