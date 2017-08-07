import axios from 'axios';
import { browserHistory  } from 'react-router';
import { AUTH_USER,
         AUTH_ERROR,
         UNAUTH_USER
     } from './types';

const API_URL = 'http://localhost:3090';
export function signinUser({ username, password }) {

  return function(dispatch) {
    //make any async request or action and at some point in the future
    //we will call dispatch method and pass in an action of whatwver type we want

    //Submit email/password to server
    //object will look like ES6 cyz key and val rSame{username:username, password:password}
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
/*

Action creator always returns an object
the object is called an action and it has a type
^this rule goes out the window because of rexux thunk

instead of returning an object, we will return a function

function is how we get access to Dispatch
by using redux-think
Redux thunk is allowing us to return a function from an action creator and it's going to call that function with a dispatch method from redux
//funciton is automatically called with the dispatch method

the dispatch method accepts an action and forwards it off to all the differnet reducers we have in our application it's the main pipline of redux
//purpose of redux thunk is to allow us ot dispatch multiple differnet actions inside of
an action creator

with redux thunk we are not limieted to a single action
we can also insert other logic we can handle both diff cases for whther request is good or bad and if the req is good we can handle all the different side effects as well

with a normal action, whenever we return an object, it's a very synchronous operation that action is taken and immediately sent off to all diff redux

with redux thunk, there is no syncronsou action here the function will be called with dispatch but we can wait as long as want to dispatch an action

*/