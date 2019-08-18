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
  currentURL: '/tiger.svg',
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

var exportASCII = function(meshGroup) {
  var result = exporter.parse(meshGroup);
  // let objectExtension = objectName + '.stl'
  saveString(result, 'thing.stl');
}

var exportBinary = function (meshGroup) {
  var result = exporter.parse(meshGroup, { binary: true });
  saveArrayBuffer(result, 'thing.stl');
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
      group = new THREE.Group();
      var scalarSettings;
      var extrudeSettings = {
        depth: 6,
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

          //place cylinder and offsetting stroke material here
          var baseMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            opacity: 0.3,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            wireframe: false
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

              if (i === 0) {

                var baseRadius = 135;
                var baseHeight = 3;
                var baseGeometry = new THREE.CylinderBufferGeometry(baseRadius, baseRadius, baseHeight, 64);
                var cylinder = new THREE.Mesh(baseGeometry, [strokeMaterial, baseMaterial]);
                cylinder.position.set(-(group.position.x * (1 + group.scale.x)) + baseHeight, (group.position.y * (1 - group.scale.y)) + baseHeight, baseHeight / 2);
                cylinder.rotation.set(Math.PI / 2, 0, 0);
                group.add(cylinder);
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
    loadSVG('public/tiger.svg', false);
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
    loadSVG('public/sig.svg', true);
    // this.props.renderDrawing({
    //   fileString: 'sig',
    //   extrude: 'extrude'
    // });
    // scene.add(this.props.currentMesh);
    animate();
   
  }

  render() {
    return (
      <div className='container text-center'>
        <div className='row'>
          <div className='col-12'>
            <button
              className='btn btn-block btn-success mb-2'
              onClick={e => {
                e.preventDefault();
                // exportBinary(group);
              }}
            >
              Save As 3D Model
            </button>
            <div ref={ref => (this.mount = ref)} 
              
            />
            <button
              className='btn btn-block btn-primary'
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
    currentMesh: state.currentMesh,
    timeStamp: state.timeStamp
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ renderDrawing }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Shape);