import { LOGIN_USER, AUTHENTICATE_USER } from '../actions/constants';

const INITIAL_STATE = { token: null, session: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOGIN_USER:
      var response = action.payload.data.login;
      return { ...state, token: response.token, number: response.number }
    case AUTHENTICATE_USER:
      var response = action.payload.data.authenticate;
      debugger;
      return { ...state, session: response.session }
    default:
      return state;
  }
}
