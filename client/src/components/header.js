import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    if(this.props.authenticated) {
      //show a link to sign out
      return <li>
        <Link to="/signout">Sign Out</Link>
      </li>
    } else {
        //show a link to user to sign in or sign up
        const signupClass = this.props.pathname === '/signup'
          ? 'signup active'
          : 'signup';

        const signinClass = this.props.pathname === '/signin'
          ? 'signin active'
          : 'signin';


        return [
          <li key={1} className={signupClass}>
            <Link to="/signup">Sign Up</Link>
          </li>,
          <li key={2} className={signinClass}>
            <Link to="/signin">Sign In</Link>
          </li>
        ];
    }
  }
  render() {
    return (
      <div id="header">
      <Link to="/">MBot Auth</Link>
        <ul>
          {this.renderLinks()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);