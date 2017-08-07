import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ username, password }){

    this.props.signinUser({ username, password});
  };

  renderAlert(){
    if(this.props.errorMessage){
      return (
        <div className="error-message">
          <strong>Oops! </strong>{this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, fields: { username, password }} = this.props;

    return (
      <form className="form-login" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} >
        {this.renderAlert()}
        <div className="form-field">
          <label className="user">username: </label>
          <input type="text" id="login-username" className="form-input" {...username} />
        </div>

        <div className="form-field">
          <label className="lock">Password: </label>
          <input type="password" id="login-password" className="form-input" {...password} />
        </div>

        <button type="submit" className="login-button" action="submit">Login
        </button>
      </form>
    );
  }
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error };
}

Signin = connect(mapStateToProps, actions)(Signin)

export default reduxForm({
  form: 'signin',
  fields: ['username', 'password']
})(Signin);