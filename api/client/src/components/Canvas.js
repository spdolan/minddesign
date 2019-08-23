import React, { Component } from 'react';
import { updateDrawing, getFile } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SignatureCanvas from 'react-signature-canvas';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = { svgDataURL: null, fileNumber: null };
    this.sigPad = {};
    this.createRandomNumber = this.createRandomNumber.bind(this);
    this.createFileName = this.createFileName.bind(this);
  }

  createRandomNumber = () => { return Math.floor(Math.random() * 100000000) }

  createFileName = () => {
    let currentFile;
    if (this.props.auth.authenticated) {
      currentFile = `${this.props.auth.name}-${this.createRandomNumber()}.svg`;
    } else {
      currentFile = `guest-${this.createRandomNumber()}.svg`
    }

    return currentFile;
  }

  componentDidMount(){

    this.setState({fileName: this.createFileName()})
  }

  

  clear = () => {
    this.setState({ fileName: this.createFileName()}, () => {
      this.sigPad.clear();
    })
  }

  renderDrawing = () => {
        
    this.setState({
      svgDataURL: this.sigPad.toDataURL('image/svg+xml')
    }, () => {
        let mySVG = this.state.svgDataURL.split(',');
        this.props.updateDrawing(this.state.fileName, atob(mySVG[1]));
        // this.props.setFile(this.state.fileName);
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
    auth: state.auth,
    timeStamp: state.timeStamp
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateDrawing, getFile }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);