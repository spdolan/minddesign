import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { } from '../actions/index';

const DesignCard = ({ design }) => {

  return (
    <div
      className='card text-center align-middle text-white bg-dark border-dark shadow'
      onClick={e => {
        e.preventDefault();
        alert(`clicked design ${design.designName}`);
      }}
    >
      <div className="card-body">
        <h5 className="card-title">
          {design.designName}
        </h5>
        <img src={design.svgLink} height='auto' width='auto' className="card-img-top" alt="sweet design"></img>
        
      </div>
      <div className='card-footer'>
        
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(DesignCard);