import React, { Component } from 'react';
// import {  } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Canvas from './Canvas';
import Shape from './Shape';
import WorkingShape from './WorkingShape';

class App extends Component {
  constructor(props){
    super(props);

  }
  

  render() {
    return (
      <div className='container main-app'>
        <div className='jumbotron text-center mt-4'>
          <h1>Working Title</h1>
        </div>
        <div className='row mb-4'>
          <div className='col-md-12 text-center'>
            <p> We'll probably put some user info here?</p>
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
    // products: state.products,
    // categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({  }, dispatch);
}

export default connect(null, null)(App);