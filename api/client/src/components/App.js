import React, { Component } from 'react';
import { userLogin } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Canvas from './Canvas';
import Shape from './Shape';

class App extends Component {
  constructor(props){
    super(props);

  }
  
  render() {
    return (
      <div className='container main-app'>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">MindDesign</a>
          {/* <form class="form-inline">
            <input class="form-control mr-sm-2" type="search" placeholder="Search Designs" aria-label="Search" ></input>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form> */}
          <button 
            className="btn btn-danger my-2 my-sm-0" 
            onClick={e => {
              e.preventDefault();
              
            }}
          >
            Login <i className="fab fa-google"></i>
          </button>

        </nav>
        <div className='row mb-4'>
          <div className='col-md-12 text-center'>
            <p> We'll probably put some user info here? <i className="fas fa-crown"></i></p>
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
    currentUser: state.currentUser
    // categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ userLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);