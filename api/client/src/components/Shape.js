import React, { Component } from 'react';
import { renderDrawing, setFile } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import THREE from "../three";
import { GUI } from 'three/examples/js/libs/dat.gui.min.js';

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

var guiData = {
  currentModel: 'tiger.svg',
  extrude: false
};

// instantiate a loader, exporter, and group
var loader = new THREE.SVGLoader();
var exporter = new THREE.STLExporter();
var group;

//append a link, from our Three.js examples
var link = document.createElement('a');
link.style.display = 'none';
document.body.appendChild(link);

// console.log(loader);
var animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

var onWindowResize = function () {

  if (window.innerWidth <= 768) {
    threeWidth = ((window.innerWidth * 0.8));
    threeHeight = ((window.innerHeight * 0.5));
  } else {
    threeWidth = ((window.innerWidth * 0.37));
    threeHeight = ((window.innerHeight * 0.5));
  }

  camera.aspect = threeWidth / threeHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(threeWidth, threeHeight);
}

var clearThree = function (obj) {
  while (obj.children.length > 1) {
    clearThree(obj.children[(obj.children.length - 1)])
    obj.remove(obj.children[(obj.children.length - 1)]);
  }
  if (obj.geometry) obj.geometry.dispose()
  // console.log(obj.material)

  if (obj.material !== undefined){
    if (obj.material.length !== undefined) {
      obj.material.forEach(material => {
        material.dispose();
      });
    } else {
      obj.material.dispose();
    }
  }
  if (obj.texture) obj.texture.dispose()
} 

var scaleGroup = function(meshGroup, scalar){
  meshGroup.scale.multiplyScalar(scalar);
  //three.js faces "away" from our perspective, so update
  meshGroup.scale.y *= - 1;
}

var exportASCII = function(meshGroup) {
  var result = exporter.parse(meshGroup);
  // let objectExtension = objectName + '.stl'
  saveString(result, 'thing.stl');
}
var exportBinary = function (meshGroup) {
  scaleGroup(meshGroup, 0.15);
  meshGroup.updateMatrixWorld(true);
  var result = exporter.parse(meshGroup, { binary: true });
  saveArrayBuffer(result, 'thing.stl');
  scaleGroup(meshGroup, 6.1);
  meshGroup.updateMatrixWorld(true);
}

var saveString = function(text, filename) {
  save(new Blob([text], { type: 'text/plain' }), filename);
}
var saveArrayBuffer = function(buffer, filename) {
  save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
}

var save = function (blob, filename) {
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

const arrayToPoints = function(array){
  let removeZeroArray = array.filter(point => { return point !== 0 });  
  let newArray = [];
  for(var i = 0; i < removeZeroArray.length; i+=2){
    let myPoint = new THREE.Vector2(removeZeroArray[i], removeZeroArray[i+1]);
    newArray.push(myPoint);
  }
  return newArray;
}

var gui;

const setInitialScale = (extrudeBoolean, svgUrl) => {
  var scalarSettings;

  //select between true/false for extrude and check for remote sig file (v1 of app)
  //v2 of app will take in remote url and not be concerned with naming
  if (!svgUrl.includes('tiger')) {
    scalarSettings = 0.6;
    group.position.x = -85;
    group.position.y = 85;
  }
  else {
    scalarSettings = 0.25;
    group.position.x = -70;
    group.position.y = 70;
  }

  //update our overall group with determined settings
  scaleGroup(group, scalarSettings);
  // group.scale.y *= - 1;
  //forces our transformations
  group.updateMatrixWorld(true);
}

const createStampBase = (extrude, shape, group, materialArray, svgUrl) => {
  
  var boxShape = new THREE.BoxHelper(group, 0xffff00);
  let groupCenterX = boxShape.geometry.boundingSphere.center.x;
  let groupCenterY = boxShape.geometry.boundingSphere.center.y;
  
  if(extrude && svgUrl.includes('sig')){
    var baseShape;
    if (shape === 'circle') {
      var baseRadius = (1 / group.scale.x) * boxShape.geometry.boundingSphere.radius;
      var baseHeight = 3;
      var baseGeometry = new THREE.CylinderBufferGeometry(baseRadius, baseRadius, baseHeight, 64);
      baseShape = new THREE.Mesh(baseGeometry, materialArray);
      baseShape.position.set((1 / group.scale.x) * (Math.abs(group.position.x) + groupCenterX), -(1 / group.scale.y) * (Math.abs(group.position.y) - groupCenterY), baseHeight / 2);
      baseShape.rotation.set(Math.PI / 2, 0, 0);
      
    } else if (shape === 'square'){
      baseShape = new THREE.BoxHelper(group, 0xffff00);
      
    }

    group.add(baseShape);
    scene.updateMatrixWorld(true);
  }
}

const createBasicMaterial = (color, opacity, transparent) => {
  let myMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color().setStyle(color),
    opacity: opacity,
    transparent: transparent,
    side: THREE.DoubleSide,
    depthWrite: false
    // wireFrame: false

  });

  return myMaterial;
}

var loadSVG = function (svgUrl, extrude){
  // load a SVG resource
  loader.load(
    // resource URL
    svgUrl,
    // called when the resource is loaded
    function (data) {

      const paths = data.paths;
      group = new THREE.Group();
      
      const extrudeSettings = {
        depth: 7,
        steps: 1,
        bevelEnabled: false,
        bevelThickness: 2,
        bevelSize: 4,
        bevelSegments: 1
      };

      setInitialScale(extrude, svgUrl);

      for (let i = 0; i < paths.length; i++) {
        //let's add our printing base here!
        
        const path = paths[i];
        const fillColor = path.userData.style.fill;

        if (fillColor !== undefined && fillColor !== 'none') {
          const material = createBasicMaterial(fillColor, path.userData.style.fillOpacity, path.userData.style.fillOpacity < 1);

          const shapes = path.toShapes(true);
          for (let j = 0; j < shapes.length; j++) {
            const shape = shapes[j];
            const geometry = new THREE.ShapeBufferGeometry(shape);
            const mesh = new THREE.Mesh(geometry, material);
            group.add(mesh);
          }
        }

        const strokeColor = path.userData.style.stroke;
        if (strokeColor !== undefined && strokeColor !== 'none') {
          var strokeMaterial = createBasicMaterial(strokeColor, path.userData.style.strokeOpacity, path.userData.style.strokeOpacity < 1);

          for (let k = 0, kl = path.subPaths.length; k < kl; k++) {
            const subPath = path.subPaths[k];
            var strokeGeometry, strokeMesh, threeDGeometry;

            if (extrude) {
              if (k < path.subPaths.length) {
                strokeGeometry = new THREE.SVGLoader.pointsToStroke(subPath.getPoints(), path.userData.style);
                let wirePoints = arrayToPoints(strokeGeometry.attributes.position.array);
                for (let p = 0; p < wirePoints.length; p += 3) {
                  const newGeometry = new THREE.Shape([wirePoints[p], wirePoints[p + 1], wirePoints[p + 2]]);
                  if (newGeometry) {
                    threeDGeometry = new THREE.ExtrudeBufferGeometry(newGeometry, extrudeSettings);
                    strokeMesh = new THREE.Mesh(threeDGeometry, strokeMaterial);
                    group.add(strokeMesh);
                  }
                }
              }
            } 
            else {
              if (k < path.subPaths.length ){
                strokeGeometry = new THREE.SVGLoader.pointsToStroke(subPath.getPoints(), path.userData.style);
                if (strokeGeometry) {
                  strokeMesh = new THREE.Mesh(strokeGeometry, strokeMaterial);
                  group.add(strokeMesh);
                }
              }
            } 
          }

          scene.add(group);
        }
      }

      //place cylinder material here
      var baseMaterial = createBasicMaterial(0x00ffff, 0.3, true);
      //add our base helper with array of materials
      createStampBase(extrude, 'circle', group, [strokeMaterial, baseMaterial], svgUrl)
      // createStampBase(extrude, 'square', group, [strokeMaterial, baseMaterial], svgUrl)
    },
    // called when loading is in progresses
    function (xhr) {
      // console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

      console.log('An error happened');

    }
  );
}

class Shape extends Component {

  constructor(props){
    super(props);
    this.state = {
      circle: true
    }
    this.createGUI = this.createGUI.bind(this);
    this.saveSVG = this.saveSVG.bind(this);
  }

  componentDidMount() {
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild(renderer.domElement);
    // this.createGUI();

    // this.mount.prepend(gui.domElement);
    // load a SVG resource
    loadSVG('public/tiger.svg', false);
    // this.props.renderDrawing({
    //   fileString:'tiger', 
    //   extrude: 'flat'
    // });
    // scene.add(this.props.currentMesh);

    window.addEventListener('resize', onWindowResize, false);
    
    animate();

    
    // === THREE.JS EXAMPLE CODE END ===
  }

  createGUI = () => {
    const update = () => {
      clearThree(scene);
      let myURL = 'public/' + model;
      console.log(myURL);
      loadSVG('public/sig.svg', guiData.extrude);
    }

    if (gui) gui.destroy();
    gui = new GUI({ width: 150 });
    // var f1 = gui.addFolder('Flow Field');
    const model = this.props.currentModel;
    gui.add(guiData, 'extrude').name('Extrude?').onChange(update);
    // scene.add(gui);
    // gui.add(guiData, 'extrude').name('Extrude?').onChange(update);
    // f1.open();  
}

  componentDidUpdate(){
    console.log(this.props.currentModel);
    let publicUrl = 'public/' + this.props.currentModel;
    clearThree(scene);
    loadSVG(publicUrl, guiData.extrude);
    // this.props.renderDrawing({
    //   fileString: 'sig',
    //   extrude: 'extrude'
    // });
    // scene.add(this.props.currentMesh);
    
    animate();
   
  }

  saveSVG = function () {
    let publicUrl = 'http://localhost:8000/download/' + this.props.currentModel;
    link.href = publicUrl;
    link.download = 'myDesign.svg';
    link.click();
  } 

  render() {
    return (
      <div className='container text-center'>
        <div className='row'>
          <div className='col-12'>
            <div className='row'>
              <div className='col-6'>
                <button
                  className='btn btn-block btn-primary mb-2'
                  onClick={e => {
                    e.preventDefault();
                    // alert('Feature not live yet! \n Check back in on Demo Night.');
                    this.saveSVG();
                    // exportBinary(group);
                  }}
                >
                  Download As SVG
                </button>
              </div>
              <div className='col-6'>
                <button
                  className='btn btn-block btn-success mb-2'
                  onClick={e => {
                    e.preventDefault();
                    alert('Feature not live yet! \n Check back in on Demo Night.')
                    // exportBinary(group);
                  }}
                >
                  Save My Design
                </button>
              </div>
            </div>

            <div ref={ref => (this.mount = ref)} 
              
            />
            <button
              className='btn btn-block btn-secondary'
              onClick={e => clearThree(scene)}
            >
              Clear Canvas
            </button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentModel: state.currentModel,
    timeStamp: state.timeStamp
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ renderDrawing }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Shape);