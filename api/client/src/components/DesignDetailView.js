import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDesign } from '../actions/index';


class DesignDetailView extends React.Component {

  constructor(props){
    super(props);

  }

  componentDidMount(){
    this.props.getDesign(this.props.match.params.designId);
  }

  render(){
    if (!this.props.currentDesign){
      return (
        <div>
          <h3>Hold please, we're loading...</h3>
        </div>
      );
    } else if (this.props.currentDesign.length === 0)
      return (
        <div>
          <h3>It looks like that design was deleted, please try another search.</h3>
        </div>
      );
    else {
      return (
        <div>
          {this.props.currentModel}
        </div>
      );

    }
    
  }
  
}

function mapStateToProps(state, ownProps) {
  
  return {
    auth: state.auth,
    currentDesign: state.currentDesign,
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