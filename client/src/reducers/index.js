import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  form: form,
  auth: authReducer
});

/*
form property of state is going to be produced by my redux form reducer

reducer as form simply changes the variable reducer to form when we import it
if not it would look like: form: reducer ES6
*/
export default rootReducer;
