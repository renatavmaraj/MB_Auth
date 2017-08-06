import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    //Call Action creator to sign up user
    this.props.signupUser(formProps);
    e.preventDefault()
    return false;
  };

  renderAlert(){
    if(this.props.errorMessage) {
      return (
        <div>
          <strong>Oops!</strong>{this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { username, password, passwordConfirm }} = this.props;

    return (
      <form className="form-login" onSubmit={this.handleFormSubmit.bind(this)} >
        <div className="form-field">
          <label className="user">Username: </label>
          <input type="text" id="login-username" className="form-input" {...username} />
        </div>
        <div className="error">
          {username.touched && username.error && <div className="error">{username.error}</div>}
        </div>

        <div className="form-field">
          <label className="lock">Password: </label>
          <input type="password" className="login-password" className="form-input" {...password} />
        </div>
        <div className="error">
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </div>

        <div className="form-field">
          <label className="lock"> Confirm Password: </label>
          <input type="password" className="login-password" className="form-input" {...passwordConfirm} />
        </div>
        <div className="error">
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </div>

        {this.renderAlert()}
        <button type="submit" className="login-button" action="submit" style={{ background: 'orange' }}>
          Signup
        </button>
      </form>
    );


  }
}

function validate(formProps){
  const errors = {};

  if(!formProps.username){
    errors.username = 'Please enter a username';
  }

  if(!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if(!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if(formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

// function mapStateToProps(state){
//   return { errorMessage: state.auth.error };
// }

// Signup = connect(mapStateToProps, actions)(Signup)

export default reduxForm({
  form: 'signup',
  fields: ['username', 'password', 'passwordConfirm'],
  validate: validate
})(Signup);