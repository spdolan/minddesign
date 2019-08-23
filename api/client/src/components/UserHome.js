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
      return <DesignCard design={design} key={design._id}/>
    }))
  }

  render() {

    if (!this.props.designs) {
      return (
        <div className='row'>
          <div className='col-12'>
            <h1>Nothing to see here yet... hold please...</h1>
          </div>
        </div>
      );
    } else if (this.props.designs.length === 0) {
      return (
        <div className='row'>
          <div className='col-12'>
            <h4>Hey! Looks like you don't have any designs just yet...</h4>
          </div>
        </div>
      );
    } else

      return (
        <div className='row'>
          <div className='col-12'>
            <div className='card-group'>
              <div className="card-columns mb-4">
                {this.renderDesigns(this.props.designs)}
              </div>
            </div>
          </div>
        </div>
        
      );

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