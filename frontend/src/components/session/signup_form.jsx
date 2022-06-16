import React from 'react';
import { withRouter } from 'react-router-dom';
import { BiErrorCircle } from 'react-icons/bi';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      handle: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/login');
    }
    this.setState({errors: nextProps.errors})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      handle: this.state.handle,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user)
    .then(() => this.props.history.go(-1))
  }
  renderError(type){
    return (
      <div className='error'><BiErrorCircle/>{this.state.errors[type]}</div>
    )
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
					<div className='auth-header'>Create Account</div>
					<a href='/#/login'>Sign In</a>
				</div>
        <form onSubmit={this.handleSubmit} className="auth-form">
            <div className='input-error'>
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                placeholder="Email"
              />
              {this.state.errors.email && this.renderError('email')}
            </div>
            <div className='input-error'>
              <input type="text"
                value={this.state.handle}
                onChange={this.update('handle')}
                placeholder="Handle"
              />
              {this.state.errors.handle && this.renderError('handle')}
            </div>
            <div className='input-error'>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
              />
              {this.state.errors.password && this.renderError('password')}
            </div>
            <div className='input-error'>
              <input type="password"
                value={this.state.password2}
                onChange={this.update('password2')}
                placeholder="Confirm Password"
              />
              {this.state.errors.password2 && this.renderError('password2')}
            </div>
            <input type="submit" value="Sign up" className='btn' />
            {/* {this.renderErrors()} */}
        </form>
        </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);