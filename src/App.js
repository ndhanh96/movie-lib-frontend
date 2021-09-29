import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './app/Navbar';
import Home from './features/homepage/Home';
import Login from './features/loginpage/Login'
import Signup from './features/loginpage/Signup'
import MoviePage from './features/movie/MoviePage'
import Footer from './app/Footer'

import 'antd/dist/antd.css';
import './App.scss';

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
          <Redirect to='/'/>
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
