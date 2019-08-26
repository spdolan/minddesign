import React, { Component } from 'react';
import { getPublicDesigns } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DesignGrid from './DesignGrid';

class PublicDesigns extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.displayDesigns = this.displayDesigns.bind(this);
  }

  componentDidMount(){
    this.props.getPublicDesigns()
  }

  displayDesigns(){
    if (!this.props.designs) {
      return (
        <h1>Nothing to see here yet... hold please...</h1>
      );
    } else if (this.props.designs.length === 0) {
      return (
        <div>
          <h4>Hey! Looks like you don't have any designs yet!</h4>
          <h4>Unless we're briefly searching, head to the homepage and make something awesome.</h4>
        </div>
      );
    } else{

      return (
        <DesignGrid designs={this.props.designs} />
      );
    }
  }

  render() {
    return (
      <>
      <div className='row'>
        <div className='col-12'>
          {this.displayDesigns()}
        </div>
      </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    designs: state.designs
    // timeStamp: state.timeStamp
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPublicDesigns }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicDesigns);