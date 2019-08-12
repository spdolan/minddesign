import React, { Component } from 'react';
import { renderDrawing } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import THREE from "../three";

// === THREE.JS CODE START ===
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xb0b0b0);

var helper = new THREE.GridHelper(160, 10);
helper.rotation.x = Math.PI / 2;
scene.add(helper);
// var camera = new THREE.PerspectiveCamera(75, ((window.innerWidth * 0.5) - (window.innerWidth * 0.1)) / ((window.innerHeight * 0.5)), 0.1, 1000);
var camera = new THREE.PerspectiveCamera(50, ((window.innerWidth * 0.5) - (window.innerWidth * 0.1)) / ((window.innerHeight * 0.5)), 1, 1000);
camera.position.set(0, 0, 200);
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(((window.innerWidth * 0.5) - (window.innerWidth * 0.1)), ((window.innerHeight * 0.5)));
//add in pan/view options
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.screenSpacePanning = true;

var guiData = {
  currentURL: 'http://localhost:8000/tiger.svg',
  extrude: false
};

// instantiate a loader
var loader = new THREE.SVGLoader();
// console.log(loader);
var animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

var onWindowResize = function () {
  camera.aspect = ((window.innerWidth * 0.5) - (window.innerWidth * 0.1)) / ((window.innerHeight * 0.5));
  camera.updateProjectionMatrix();
  renderer.setSize((window.innerWidth * 0.5) - (window.innerWidth * 0.1), (window.innerHeight * 0.5));
}

var clearThree = function (obj) {
  while (obj.children.length > 1) {
    clearThree(obj.children[(obj.children.length - 1)])
    obj.remove(obj.children[(obj.children.length - 1)]);
  }
  if (obj.geometry) obj.geometry.dispose()
  if (obj.material) obj.material.dispose()
  if (obj.texture) obj.texture.dispose()
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

// var gui;

// const createGUI = function() {
//   if (gui) gui.destroy();
//   gui = new THREE.GUI({ width: 350 });
//   gui.add(guiData, 'extrude').name('Extrude?').onChange(update);
//   function update() {
//     loadSVG(guiData.currentURL);
//   }
// }

var loadSVG = function (svgUrl, extrude){
  // load a SVG resource
  loader.load(
    // resource URL
    svgUrl,
    // called when the resource is loaded
    function (data) {

      var paths = data.paths;
      var group = new THREE.Group();
      var scalarSettings;
      var extrudeSettings = {
        depth: 10,
        steps: 1,
        bevelEnabled: false,
        bevelThickness: 2,
        bevelSize: 4,
        bevelSegments: 1
      };
      if (extrude) {
        
        scalarSettings = 0.6;
        group.position.x = -85;
        group.position.y = 85;
      } else {
        scalarSettings = 0.25;
        group.position.x = -70;
        group.position.y = 70;
      }

      group.scale.multiplyScalar(scalarSettings);
      
      group.scale.y *= - 1;

    //  console.log(group.scale);

      for (var i = 0; i < paths.length; i++) {
        //let's add our printing base here!
        if (extrude && i === 0) {

          var baseRadius = 135;
          var baseHeight = 5;
          var baseGeometry = new THREE.CylinderBufferGeometry(baseRadius, baseRadius, baseHeight, 64);
          var baseMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            opacity: 0.3,
            transparent: true,
            side: THREE.FrontSide,
            depthWrite: false
            // wireframe: true
          });
          var cylinder = new THREE.Mesh(baseGeometry, baseMaterial);
          cylinder.position.set(-(group.position.x * (1 + group.scale.x)) + baseHeight, (group.position.y * (1 - group.scale.y)) + baseHeight, baseHeight / 2);
          cylinder.rotation.set(Math.PI / 2, 0, 0);
          group.add(cylinder);
        }

        var path = paths[i];
        var fillColor = path.userData.style.fill;

        if (fillColor !== undefined && fillColor !== 'none') {
          var material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setStyle(fillColor),
            opacity: path.userData.style.fillOpacity,
            transparent: path.userData.style.fillOpacity < 1,
            side: THREE.DoubleSide,
            depthWrite: false

          });
          var shapes = path.toShapes(true);
          for (var j = 0; j < shapes.length; j++) {
            var shape = shapes[j];
            var geometry = new THREE.ShapeBufferGeometry(shape);
            var mesh = new THREE.Mesh(geometry, material);
            group.add(mesh);
          }
        }

        var strokeColor = path.userData.style.stroke;
        if (strokeColor !== undefined && strokeColor !== 'none') {
          var strokeMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setStyle(strokeColor),
            opacity: path.userData.style.strokeOpacity,
            transparent: path.userData.style.strokeOpacity < 1,
            side: THREE.DoubleSide,
            depthWrite: false
            // wireframe: true
          });

          for (var k = 0, kl = path.subPaths.length; k < kl; k++) {
            var subPath = path.subPaths[k];
            var strokeGeometry, strokeMesh, threeDGeometry;

            if (extrude) {
              if (k < path.subPaths.length) {
                strokeGeometry = new THREE.SVGLoader.pointsToStroke(subPath.getPoints(), path.userData.style);
                let wirePoints = arrayToPoints(strokeGeometry.attributes.position.array);
                for (var p = 0; p < wirePoints.length; p += 3) {
                  var newGeometry = new THREE.Shape([wirePoints[p], wirePoints[p + 1], wirePoints[p + 2]]);
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

          // console.log(group);
          scene.add(group);
        }
      }

      
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
  }

  componentDidMount() {
    // // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild(renderer.domElement);
    // load a SVG resource
    loadSVG('http://localhost:8000/tiger.svg', false);
    // this.props.renderDrawing({
    //   fileString:'tiger', 
    //   extrude: 'flat'
    // });
    // scene.add(this.props.currentMesh);

    window.addEventListener('resize', onWindowResize, false);
    // createGUI();
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }

  componentDidUpdate(){
  //  console.log(scene);
    clearThree(scene);
    loadSVG('http://localhost:8000/sig.svg', true);
    // this.props.renderDrawing({
    //   fileString: 'sig',
    //   extrude: 'extrude'
    // });
    // scene.add(this.props.currentMesh);
    animate();
   
  }

  render() {
    return (
      <>
        <div ref={ref => (this.mount = ref)} />
        <button
          className='btn btn-block btn-primary'
          onClick={e => clearThree(scene)}
        >
          Clear Canvas
        </button>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentMesh: state.currentMesh,
    timeStamp: state.timeStamp
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ renderDrawing }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Shape);