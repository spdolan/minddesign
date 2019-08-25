import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Shape from './Shape';
import Canvas from './Canvas';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function GuestHelperModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Welcome to Mind Design!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Getting Started</h4>
        <ul>
          <li>Use a stylus (or your favorite digit) to draw in the blank white box below.</li>
          <li>Click 'Clear Pad' if that doesn't feel right. Click 'Draw To Canvas' if it does!</li>
          <li>Your design will then appear in the grey canvas. From there...</li>
          <li>Feel free to download as an SVG image file!</li>
          <li>Or click 'Extrude' to see as a mini-stamp, you'll be able to download a 3D file of it.</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const LandingPage = ({auth}) => {

  const modalOnLanding = !auth.authenticated;

  const [modalShow, setModalShow] = React.useState(modalOnLanding);

  const renderGreeting = (auth) => {
    return auth.authenticated ?
        <h1 className="display-5">Welcome back, {auth.name}</h1> :
        <h1 className="display-5">Mind Design</h1>
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