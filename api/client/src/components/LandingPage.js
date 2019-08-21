import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Shape from './Shape';
import Canvas from './Canvas';

const LandingPage = () => {
  return (
    <>
      <div className='row'>
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
          {/* let's place some extra content here */}
        </div>
      </div>
    </>
  );
};

export default LandingPage;