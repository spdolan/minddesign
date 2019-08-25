import React from 'react';
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

export default GuestHelperModal;