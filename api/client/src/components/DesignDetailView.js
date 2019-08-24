import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDesign } from '../actions/index';
import Shape from './Shape';


class DesignDetailView extends React.Component {

  constructor(props){
    super(props);

  }

  componentDidMount(){
    this.props.getDesign(this.props.currentModelId);
  }

  render(){
    if (!this.props.designs){
      return (
        <div>
          <h3>Hold please, we're loading...</h3>
        </div>
      );
    } else if (this.props.designs.length === 0 || this.props.designs.length === undefined)
      return (
        <div>
          <h3>It looks like that design was deleted, please try another search.</h3>
        </div>
      );
    else {
      return (
        <>
        <div className='row'>
          <div classname='col-12'>
            <div>
              Stats for {this.props.designs[0].designName}<br></br>
              Makes: 5<br></br>
              Likes: {this.props.designs[0].likes}<br></br>
            </div>
          </div>
        </div>
        <div className='row'>
          <div classname='col-8'>
            <Shape url='user' />
          </div>
        </div>
        </>
      );

    }
    
  }
  
}

function mapStateToProps(state, ownProps) {
  
  return {
    auth: state.auth,
    designs: state.designs,
    currentModel: state.currentModel,
    currentModelId: ownProps.match.params.designId

    // timeStamp: state.timeStamp
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getDesign }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesignDetailView);