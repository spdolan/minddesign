import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';

const Navbar = ({ authenticated, email, signout }) => {
  
  const handleSignOutClick = () => {
    signout();
  };

  const renderLinks = () => {
    if (authenticated) {
      return (
        <>
          <li>{email}</li>
          <li><button onClick={handleSignOutClick}>Sign Out</button></li>
        </>
      );
    } else {
      return (
        <>
          <li><Link to="/signup" className='btn btn-sm btn-outline-primary'>Sign Up</Link></li>
          <li><Link to="/signin" className='btn btn-sm btn-outline-success'>Sign In</Link></li>
        </>
      );
    }
  }


  return (

    <nav className="navbar navbar-light bg-light">
      <NavLink className="navbar-brand" href="/">MindDesign</NavLink>
      {/* <form class="form-inline">
            <input class="form-control mr-sm-2" type="search" placeholder="Search Designs" aria-label="Search" ></input>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form> */}
      <ul class="navbar-nav mr-auto">
        {renderLinks()}
      </ul>

    </nav>
  );
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    email: state.auth.email
  };
}

export default connect(mapStateToProps, actions)(Navbar);
