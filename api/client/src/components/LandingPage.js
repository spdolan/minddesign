import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Shape from './Shape';
import Canvas from './Canvas';
import GuestHelperModal from './GuestHelperModal'

const LandingPage = ({auth}) => {

  const modalOnLanding = !auth.authenticated;

  const [modalShow, setModalShow] = React.useState(modalOnLanding);

  const guestGreeting = () => {
    let greetings = [
      'Let\'s start Making!',
      'Hand drawn, beyond hand-made.',
      'Hand-made in 2019.',
      'Picture beyond pixels.'
    ]
    let randomGreeting = Math.floor(Math.random() * greetings.length);
    return greetings[randomGreeting];
  }

  const renderGreeting = (auth) => {
    return auth.authenticated ?
        <h1 className="display-5">Welcome back, {auth.name}</h1> :
      <h1 className="display-5">{guestGreeting()}</h1>
    }
    
  return (
    <>
      <div className='row'>
        <div className='col-md-12 text-center'>

          <div className='jumbotron mt-2'>
            {renderGreeting(auth)}
          </div>
          <GuestHelperModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
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