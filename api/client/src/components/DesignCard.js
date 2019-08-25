import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router-dom';
import { } from '../actions/index';

const DesignCard = ({ design }) => {

  const randomHSLA = () => {
    let h = Math.floor(Math.random() * 360);
    let s = Math.floor(Math.random() * 100);
    let l = 40;
    let newColor = `hsla(${h},${s}%,${l}%,${0.7})`;
    return (newColor);
  }

  const formatDate = (date) => {
    let newDate = new Date(date);
    return newDate.toLocaleDateString();

  }

  return (
    <Link
      className='card text-center align-middle text-white bg-dark border-dark shadow'
      to={`/home/${design._id}`}
    >
      <div className="card-body">
        <h5 className="card-title">
          {design.designName}
        </h5>
        <img src={design.svgLink} height='auto' width='auto' className="card-img-top" style={{ background: randomHSLA() }} alt="sweet design"></img>
        
      </div>
      <div className='card-footer'>
        <p>created on {formatDate(design.created_at)}</p>
      </div>
    </Link>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(DesignCard);