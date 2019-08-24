import React, { Component } from 'react';
import { getUserDesigns } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DesignGrid from './DesignGrid';

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount(){
    this.props.getUserDesigns(this.props.auth.id)
  }

  render() {
    return (
      <>
      <div className='row'>
        <div className='col-12 text-center'>
          <div className='jumbotron'>
            <h3>{this.props.auth.name}</h3>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <DesignGrid />
        </div>
      </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
    // designs: state.designs
    // timeStamp: state.timeStamp
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserDesigns }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);