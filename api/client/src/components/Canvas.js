import React, { Component } from 'react';
import { updateDrawing } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CacheManager from '../cache';
import SignatureCanvas from 'react-signature-canvas';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.cache = new CacheManager();
    this.state = { svgDataURL: null };
    this.sigPad = {};
  }


  clear = () => {
    this.sigPad.clear()
  }

  renderDrawing = () => {
    this.setState({
      svgDataURL: this.sigPad.toDataURL('image/svg+xml')
    }, () => {
        let mySVG = this.state.svgDataURL.split(',');
        this.props.updateDrawing(atob(mySVG[1]));
    })
  }

  render() {
    return (
      <div className='container float-right'>
        <div className='row'>
          <div className='col-md-12 pr-3'>
            <SignatureCanvas
              ref={(ref) => { this.sigPad = ref }}
              penColor='black'
              backgroundColor='rgb(255,255,255)'
              canvasProps={{
                width: 300,
                height: 300,
                minwidth: 30,
                maxwidth: 35,
                mindistance: 10,
                throttle: 0,
                // dotsize: 20,
                className: 'sigCanvas offset-md-2 mb-2'
              }}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='offset-md-4'>
              <button className='btn btn-secondary btn-md' onClick={this.clear}>
                Clear
              </button>|
              <button className='btn btn-success btn-md' onClick={this.renderDrawing}>
                Render
              </button>

            {/* {this.state.svgDataURL ?
              <img className='thumbnail' src={this.state.svgDataURL} />
              : null} */}
            </div>
          </div>
        </div>  
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    // products: state.products,
    timeStamp: state.timeStamp
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateDrawing}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);