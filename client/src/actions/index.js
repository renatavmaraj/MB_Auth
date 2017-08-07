import axios from 'axios';
import { browserHistory  } from 'react-router';
import { AUTH_USER,
         AUTH_ERROR,
         UNAUTH_USER
     } from './types';

const API_URL = 'http://localhost:3090';
export function signinUser({ username, password }) {

  return function(dispatch) {
    axios.post(`${API_URL}/signin`, { username, password })
    // If request is good..
    .then(response => {
        // -- Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER })
        // -- Save the JWT token
        localStorage.setItem('token', response.data.token);
        // -- Redirect to the route '/feature'
        browserHistory.push('/feature');
    })
    .catch(() => {
        //If request is bad...
        // --Show an error to the user
        dispatch(authError('Bad Login Info'));
    });

  }

}

export function signupUser({username, password}){
    return function(dispatch) {
        axios.post(`${API_URL}/signup`, {username, password})
         .then(response => {
          dispatch({ type: AUTH_USER });
          localStorage.setItem('token', response.data.token);
          browserHistory.push('/feature');
          })
          .catch(error => dispatch(authError( error.response.data.error)));
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
    localStorage.removeItem('token');

    return { type: UNAUTH_USER }
}