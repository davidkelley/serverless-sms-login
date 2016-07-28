import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import UsersIndex from './components/users/index';
import UsersLogin from './components/users/login';
import UsersAuthenticated from './components/users/authenticated';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={UsersIndex} />
    <Route path="/login" component={UsersLogin} />
    <Route path="/authenticated" component={UsersAuthenticated} />
  </Route>
);
