import React from 'react';
import Router from 'react-router';
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

import AppController from './components/AppController/AppController';

import AboutPage from './pages/about/AboutPage';
import HomePage from './pages/home/HomePage';

export default (
  <Route name='root' path='/' handler={AppController}>
    <DefaultRoute handler={HomePage}/>
    <Route name='about' path='/about' handler={AboutPage}/>
  </Route>
);
