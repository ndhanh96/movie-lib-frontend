import React from 'react';
import loadable from '@loadable/component';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Navbar from './app/Navbar';
import Home from './features/homepage/Home';
import Footer from './app/Footer';

import 'antd/dist/antd.css';
import './App.scss';

const Login = loadable(() => import('./features/loginpage/Login'));
const Signup = loadable(() => import('./features/loginpage/Signup'));
const MoviePage = loadable(() => import('./features/movie/MoviePage'));

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/page/:pageNumber'>
          <Home />
        </Route>
        <Route path='/details/:format/:id'>
          <MoviePage />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/logout'>
          <Redirect to='/' />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
