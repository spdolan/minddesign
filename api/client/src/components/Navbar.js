import React from "react";
import { NavLink, Link } from "react-router-dom";
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
          <li className='nav-item mr-3'><Link to="/user/home" className='btn btn-md btn-secondary'>{name}'s Designs</Link></li>
          <li className='nav-item'>
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
          <li className='nav-item mx-2'><Link to="/signup" className='btn btn-sm btn-primary'>Sign Up</Link></li>
          <li className='nav-item mx-2'><Link to="/signin" className='btn btn-sm btn-success'>Sign In</Link></li>
        </>
      );
    }
  }


  return (

    <nav className="navbar fixed-top navbar-dark bg-dark align-middle text-align-middle">
      <NavLink className="navbar-brand" to="/">MindDesign</NavLink>
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
