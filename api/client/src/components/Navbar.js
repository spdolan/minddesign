import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';

const Navbar = ({ authenticated, email, name, signout }) => {
  
  const handleSignOutClick = () => {
    signout();
  };

  const renderLinks = () => {
    if (authenticated) {
      return (
        <>
          <li className='nav-item mx-1'><Link to="/public" className='btn btn-md btn-light'>Published Designs</Link></li>
          <li className='nav-item mx-1'><Link to="/home" className='btn btn-md btn-secondary'>{name}'s Designs</Link></li>
          <li className='nav-item mx-1'>
            <button
              onClick={handleSignOutClick}
              className='btn btn-md btn-info'
            >
              Sign Out
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          
          <li className='nav-item mx-1'><Link to="/signup" className='btn btn-sm btn-primary'>Sign Up</Link></li>
          <li className='nav-item mx-1'><Link to="/signin" className='btn btn-sm btn-success'>Sign In</Link></li>
        </>
      );
    }
  }


  return (

    <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark align-middle text-align-middle">

      <a className="navbar-toggler navbar-brand visible-sm" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarMobileBrandHome" aria-expanded="false" aria-label="Link to homepage" href='/'>
        <img src={process.env.PUBLIC_URL + '/MD-small.png'} width="auto" height="30" className='d-inline-block align-top' alt='Mind Design' />
      </a>
      
      <a className="navbar-brand collapse navbar-collapse" href='/' id="navbarTogglerDemo01">
        <img src={ process.env.PUBLIC_URL + '/MindDesignv1.png'} width="auto" height="30" className='d-inline-block align-top' alt='Mind Design'/>
      </a>
      {/* <form class="form-inline">
            <input class="form-control mr-sm-2" type="search" placeholder="Search Designs" aria-label="Search" ></input>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form> */}
      <div className="">
        <ul className="navbar-nav mr-2">
          {renderLinks()}
        </ul>
      </div>
    </nav>
  );
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    email: state.auth.email,
    name: state.auth.name
  };
}

export default connect(mapStateToProps, actions)(Navbar);
