import React, { Component } from 'react';
import { userLogin } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Navbar from './Navbar';
import Canvas from './Canvas';
import Shape from './Shape';

class App extends Component {
  constructor(props){
    super(props);

  }
  
  render() {
    return (
      <div className='container main-app'>
        <Navbar />
        <div className='row mb-2'>
          <div className='col-md-12 text-center'>
            
            <div className='jumbotron mt-2'>
              <h1>Hello, User</h1>
              <p> We'll probably put some user info here? <i className="fas fa-crown"></i></p>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-md-6 mb-4'>
            <Shape />
          </div>
          <div className='col-12 col-md-6 canvas text-center mb-5'>
            <Canvas />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8 offset-md-1'>
            
          </div>
        </div>
      </div>
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
  return bindActionCreators({ userLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);