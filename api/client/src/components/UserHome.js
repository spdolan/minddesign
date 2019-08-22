import React, { Component } from 'react';
import { getUserDesigns } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DesignCard from './DesignCard';

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount(){
    this.props.getUserDesigns(this.props.auth.name)
  }

  renderDesigns(designArray){
    return(designArray.map(design => {
      return <DesignCard design={design} />
    }))
  }

  render() {
    return (
      
      <div className='row'>
        <div className='col-12'>
          <div className='card-group'>

          </div>
        </div>
      </div>
      
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    designs: state.designs,
    timeStamp: state.timeStamp
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserDesigns }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);