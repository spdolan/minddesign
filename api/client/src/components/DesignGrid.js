import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserDesigns } from '../actions/index';
import DesignCard from './DesignCard';

class DesignGrid extends React.Component {

  constructor(props) {
    super(props);
    this.renderDesigns = this.renderDesigns.bind(this);
  }

  componentDidMount() {
    // this.props.getUserDesigns(this.props.auth.id)
  }

  renderDesigns(designArray) {

    return (designArray.map(design => {
      return <DesignCard design={design} key={design._id} />
    }))
  }

  render() {
    if (!this.props.designs) {
      return (
        <h1>Nothing to see here yet... hold please...</h1>
      );
    } else if (this.props.designs.length === 0) {
      return (
        <div>
          <h4>Hey! Looks like there aren't any designs here yet!</h4>
          <h4>Unless we're briefly searching, head to the homepage and make something awesome.</h4>
        </div>
      );
    } else
      
      return (
        <div className="card-columns mb-4">
          {this.renderDesigns(this.props.designs)}
        </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
    // designs: state.designs
    // categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserDesigns }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesignGrid);