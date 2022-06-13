import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/tweets');
    }

    this.setState({errors: nextProps.errors})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit=(type)=>(e)=> {
    e.preventDefault();
    let user;
    if (type = "login") {
      user = {
        email: this.state.email,
        password: this.state.password
      };
    } else if (type = "demo"){
      user = {
        email: "DemoUser@gmail.com",
        password: "123456"
      }
    }
  

    this.props.login(user)

  }

  renderErrors() {
    return(
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
	<div className='webpage auth'>
		<div className='two-col'>
			<div>
				<img src="https://www.hungrypinner.com/wp-content/uploads/2017/07/white-linen-cocktail-2.jpg"
					alt="" 
					/>
			</div>
			<div className='auth-right'>
				<div>
					<div className='auth-header'>Sign in</div>
					<a href='/#/signup'>Create Account</a>
				</div>
				<form 
					// onSubmit={this.handleSubmit}
					className="auth-form">
				<input type="text"
					value={this.state.email}
					onChange={this.update('email')}
					placeholder="Email"
				/>
				<input type="password"
					value={this.state.password}
					onChange={this.update('password')}
					placeholder="Password"
				/>
        <div className='in-line btns'>
				  <input type="submit" value="Login" className='btn' onClick={this.handleSubmit("login")}/>
				  <input type="submit" value="Login Demo" className='btn' onClick={this.handleSubmit("demo")}/>
        </div>
				{this.renderErrors()}

				</form>
			</div>
		</div>
	</div>
    );
  }
}

export default withRouter(LoginForm);