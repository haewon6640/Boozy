import React from 'react';
// import { Link } from 'react-router-dom'
import { BsPersonFill } from 'react-icons/bs';
import { GiMartini } from 'react-icons/gi';
import {FaSearch} from 'react-icons/fa';
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        searchString: ""
    }
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
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
					<div>Bar Cart</div>
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
  handleSearchType() {
    return e => {
        return this.setState({searchString: e.target.value})
    }
  }
  handleSearch(e) {
      if (e.key === "Enter") {
          this.props.history.push(`/recipes/search/search?${this.state.searchString}`)
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
                    <div className='search-bar-web'>
                        <input type="text"
                            onChange={this.handleSearchType()}
                            value={this.state.searchString}
                            onKeyDown={this.handleSearch}
                            className='search-input-web'
                            placeholder="Find your next cocktail"
                            />
                            <div onClick={()=>this.props.history.push(`/recipes/search/search?${this.state.searchString}`)} 
                                className="search-icon-container">
                                <FaSearch className="search-icon"/>
                            </div>
                    </div>
                { this.getLinks() }
            </div>
            <div className='search-bar-phone'>
                        <input type="text"
                            onChange={this.handleSearchType()}
                            value={this.state.searchString}
                            onKeyDown={this.handleSearch}
                            className='search-input-web'
                            placeholder="Find your next cocktail"
                            />
                        <div onClick={()=>this.props.history.push(`/recipes/search/search?${this.state.searchString}`)} 
                            className="search-icon-container">
                            <FaSearch className="search-icon"/>
                        </div>
                </div>
          </div>
        </div>
      );
  }
}

export default NavBar;