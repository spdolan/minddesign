import React from 'react';
import Modal from 'react-bootstrap/Modal';

function LoadingModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div class="fa-3x">
          <i class="fas fa-spinner fa-pulse"></i>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LoadingModal;