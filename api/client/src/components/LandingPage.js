import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Shape from './Shape';
import Canvas from './Canvas';

const LandingPage = ({auth}) => {

  const renderGreeting = (auth) => {
    
    if (auth.authenticated){
      return (
        
        <h1 className="display-5">Welcome back, {auth.name}</h1>
      )
    } else {
      return (
        <>
        <h1>Welcome to MindDesign!</h1>
        <h2>Getting started is (hopefully) simple:</h2>
        <ul>
          <li>Use a stylus (or your favorite digit) to draw in the blank white box below.</li>
          <li>Click 'Clear Pad' if that doesn't feel right. Click 'Draw To Canvas' if it does!</li>
          <li>Your design will then appear in the grey canvas. From there...</li>
          <li>Feel free to download as an SVG image file!</li>
          <li>Or click 'Extrude' to see as a mini-stamp, you'll be able to download a 3D file of it.</li> 
        </ul>
        </>
      )
    }
    
  } 
  return (
    <>
      <div className='row'>
        <div className='col-md-12 text-center'>

          <div className='jumbotron mt-2'>
            {renderGreeting(auth)}
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
          {/* let's place some extra content here */}
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth
    // categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, null)(LandingPage);