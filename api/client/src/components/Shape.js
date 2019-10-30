import React, { Component } from 'react';
import { downloadFile, saveDesign, createGcode } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import THREE from "../three";
import { onWindowResize, clearThree, exportBinary} from '../services/threeHelpers';
import { loadSVG } from '../services/threeLoadSvg';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

// === THREE.JS CODE START ===
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xe0e0e0);

var helper = new THREE.GridHelper(160, 10);
helper.rotation.x = Math.PI / 2;
scene.add(helper);
// console.log(window);
// var camera = new THREE.PerspectiveCamera(75, ((window.innerWidth * 0.5) - (window.innerWidth * 0.1)) / ((window.innerHeight * 0.5)), 0.1, 1000);
var threeWidth, threeHeight;
if (window.innerWidth <= 768) {
  threeWidth = ((window.innerWidth * 0.8));
  threeHeight = ((window.innerHeight * 0.5));
} else {
  threeWidth = ((window.innerWidth * 0.37));
  threeHeight = ((window.innerHeight * 0.5));
}
var camera = new THREE.PerspectiveCamera(50, threeWidth / threeHeight, 1, 1000);
camera.position.set(0, 0, 200);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(threeWidth, threeHeight);

//add in pan/view options
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.screenSpacePanning = true;

// instantiate our group
var group;

//append a link, from our Three.js examples
var link = document.createElement('a');
link.style.display = 'none';
document.body.appendChild(link);

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

class Shape extends Component {

  constructor(props){
    super(props);
    this.state = {
      circle: true,
      extrude: false,
      isLoading: false,
      downloaded: false
    }

    this.saveSVG = this.saveSVG.bind(this);
    this.renderDownloadButton = this.renderDownloadButton.bind(this)
    this.handleSaveDesign = this.handleSaveDesign.bind(this)
  }

  componentDidMount() {
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild(renderer.domElement);
    clearThree(scene);

    // load a SVG resource
    if (this.props.currentUrl){
      clearThree(scene);
      let designUserId = this.props.owner ? this.props.owner : this.props.auth.id
      let myUrl = `https://minddesign-assets.s3.amazonaws.com/${designUserId}/designs/${this.props.currentModel}`;
      loadSVG(scene, group, myUrl, false);
    } else {
      loadSVG(scene, group, 'https://minddesign-assets.s3.amazonaws.com/MDlogo-v0.svg', false);
    }
    
    window.addEventListener('resize', onWindowResize(camera, renderer, threeWidth, threeHeight), false);
    animate();
  }

  componentWillUnmount(){
    clearThree(scene);
  }

  componentDidUpdate(){
    let currentUserId = this.props.auth.id === '' || this.props.auth.id === undefined ? 'guest' : this.props.auth.id;
    let designUserId = this.props.owner ? this.props.owner : currentUserId
    let publicUrl = `https://minddesign-assets.s3.amazonaws.com/${designUserId}/designs/${this.props.currentModel}`;
    clearThree(scene);
    loadSVG(scene, group, publicUrl, this.state.extrude);
    // this.setState({isLoading: false});   
    animate();
  }

  renderDownloadButton(extrudeBoolean){
    return extrudeBoolean ?
      <button
        className='btn btn-block btn-primary mb-2'
        onClick={e => {
          e.preventDefault();
          let grabModelName = this.props.currentModel.split('.');
          // alert('Feature not live yet! \n Check back in on Demo Night.');
          this.setState({ downloaded: true });
          exportBinary(scene, link, group, grabModelName[0]);
        }}
      >
        Download As 3D Mini-Stamp
      </button>
      :
      <button
        className='btn btn-block btn-primary mb-2'
        onClick={e => {
          e.preventDefault();
          this.saveSVG();
        }}
      >
        Download As Picture
      </button>
  }

  handleSaveDesign(isLoggedInBoolean){
    if(isLoggedInBoolean){
      let dotPosition = this.props.currentModel.indexOf('.');
      let designName = this.props.currentModel.slice(0,dotPosition);
      this.props.saveDesign(this.props.auth.id, designName);
      alert(`Designed saved! Check it out under ${this.props.auth.name}'s Designs`);
    } else {
      // alert('Feature not live yet! \n Check back in on Demo Night.')
      alert('You\'ll to need to be Signed In to save! \nPlease use the links in the navigation above.')
    }
  }

  saveSVG = () => {
    let publicUrl;
    if (this.props.currentModel === 'MDlogo-v0.svg'){
      publicUrl = `https://minddesign-assets.s3.amazonaws.com/MDlogo-v0.svg`
    } else {
      let currentUserId = this.props.auth.id === '' ? 'guest' : this.props.auth.id;
      let designUserId = this.props.owner ? this.props.owner : currentUserId
      publicUrl = `https://minddesign-assets.s3.amazonaws.com/${designUserId}/designs/${this.props.currentModel}`;
    }
   
    link.href = publicUrl;
    link.download = this.props.currentModel;
    link.click();
  } 


  update = () => {
    // let loadingSpinner = <i className="fas fa-spinner fa-pulse"></i>;
    // this.mount.prepend(loadingSpinner)
    clearThree(scene);
    let currentUserId = this.props.auth.id === '' ? 'guest' : this.props.auth.id;
    let designUserId = this.props.owner ? this.props.owner : currentUserId
    let myUrl = `https://minddesign-assets.s3.amazonaws.com/${designUserId}/designs/${this.props.currentModel}`;
    this.setState({ extrude: !this.state.extrude}, () => {
      alert(`Loading, one moment please - our trusty gnomes are ${this.state.extrude ? 'Extrud' : 'Flatten' }ing your design...`)
      loadSVG(scene, group, myUrl, this.state.extrude);
      // this.setState({ isLoading: !this.state.isLoading })
    })
    // loadingSpinner.destroy();
  }

  render() {
    return (
      <div className='container text-center'>
        <div className='row'>
          <div className='col-12'>
            <div className='row mb-2'>
              <div className='col-6'>
                {this.renderDownloadButton(this.state.extrude)}
              </div>
              { this.props.currentUrl ? 
              <div></div> :
              <div className='col-6'>
                <button
                  className='btn btn-block btn-success'
                  onClick={e => {
                    e.preventDefault();
                    // alert('Feature not live yet! \n Check back in on Demo Night.')
                    this.handleSaveDesign(this.props.auth.authenticated)
                  }}
                >
                  Save My Design
                </button>
              </div>}
            </div>
            <div className='row mb-2 border border-dark rounded-lg py-1'>
              <div className='col-12'>
                <h6 className='d-inline float-left align-center'>Controls:</h6>
                <ToggleButtonGroup type="checkbox" value={this.state.extrude} 
                  onChange={this.update}
                >
                  <ToggleButton value={1} variant="info">{this.state.extrude ? 'Flatten' : 'Make 3D' }</ToggleButton>
                </ToggleButtonGroup>
                {this.props.auth.authenticated && this.state.extrude && this.state.downloaded ?
                  <button
                    className='btn btn-md btn-secondary ml-3'
                    onClick={e => {
                      e.preventDefault();
                      let grabModelName = this.props.currentModel.split('.');
                      this.props.createGcode(grabModelName[0])
                    }}
                  >
                    Create GCode
                  </button>
                  : <div></div>}
                
              </div>
            </div>
           
            <div ref={ref => (this.mount = ref)} />

            <div className='row'>
              <div className='col-12'>
                <button
                  className='btn btn-block btn-secondary'
                  onClick={e => clearThree(scene)}
                >
                  Clear Canvas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  
  return {
    currentModel: state.currentModel,
    timeStamp: state.timeStamp,
    auth: state.auth,
    currentUrl: ownProps.url
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ downloadFile, saveDesign, createGcode }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Shape);