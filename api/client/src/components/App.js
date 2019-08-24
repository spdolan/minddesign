import React, { Component } from 'react';
import {Switch, Route, Redirect } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Navbar from './Navbar';
import LandingPage from './LandingPage';
import Signup from './Signup';
import Signin from './Signin';
import UserHome from './UserHome';
import DesignDetailView from './DesignDetailView';

class App extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <>
        <Navbar />
        <div className='container main-app'>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/home' component={UserHome} />
            <Route exact path='/home/:designId' component={DesignDetailView} />
            <Redirect to='/' />
          </Switch>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
    // categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);