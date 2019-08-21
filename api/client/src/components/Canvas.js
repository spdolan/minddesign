import React, { Component } from 'react';
import { updateDrawing, setFile } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CacheManager from '../cache';
import SignatureCanvas from 'react-signature-canvas';

class Canvas extends Component {
  constructor(props) {
    super(props);
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
        this.props.setFile('sig');
    })
  }

  render() {
    return (
      <div className='container text-center justify-content-center'>
        <div className='row'>
          <div className='col-12'>
            <h3 className='text-center justify-content-center'>Start Sketching:</h3>
          </div>
        </div>
        <div className='row'>
          
          <div className='col-12'>
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
                className: 'sigPad mt-4'
              }}
            />
          </div>
        </div>
        {/* <div className='row'>
          <div className='col-6'> */}
            <button className='btn btn-secondary btn-lg mr-2' onClick={this.clear}>
              Clear Pad
            </button>
          {/* </div>
          <div className='col-6'> */}
            <button className='btn btn-success btn-lg' onClick={this.renderDrawing}>
              Draw To Canvas
            </button>
          
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
  return bindActionCreators({ updateDrawing, setFile }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);