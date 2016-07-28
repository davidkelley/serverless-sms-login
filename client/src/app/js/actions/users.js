import 'whatwg-fetch';
import _ from 'lodash';
import { push } from 'react-router-redux';

import { API_URL } from './index';
import {resetError} from './error';

import {
  ERROR,
  LOGIN_USER,
  AUTHENTICATE_USER
} from './constants';

export function loginUser(user) {
  const query = { "query":
    `mutation loginUser {
      login (
        number: "${user.number}"
      )
      {
        token,
        number
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: LOGIN_USER,
    payload: json
  }))
  .then(() => dispatch(push('/login')))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function authenticateUser(user) {
  const query = { "query":
    `mutation authenticateUser {
      authenticate (
        number: "${user.number}",
        token: "${user.token}",
        code: "${user.code}"
      )
      {
        session
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: AUTHENTICATE_USER,
    payload: json
  }))
  .then(() => dispatch(push('/authenticated')))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}
