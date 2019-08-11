const router = require('express').Router();
const fs = require('fs');
const THREE = require('../three');
// const SVGLoader = require('three/examples/js/loaders/SVGLoader');

//Some Three.js helpers/instantiators

// instantiate a loader for our SVG objects
var loader = new THREE.SVGLoader();

//function to help us extract the Vector2 points
  //from the BufferGeometry object created from our SVGLoader.pointsToStroke() method.
  //We need this because our ExtrudeBufferGeometry expects the Three.js
  //primitive Shape, but there is no helper function to convert the stroke-augmented
  //(instead of the point-thin Path) BufferGeometry to a Shape. By taking all the 
  //non-zero point values the the pointsToStroke() BufferGeometry we are able to 
  //more easily generate Shapes to feed into the Three.js ExtrudeBufferGeometry function. 
const arrayToPoints = function (array) {
  let removeZeroArray = array.filter(point => { return point !== 0 });
  let newArray = [];
  for (var i = 0; i < removeZeroArray.length; i += 2) {
    let myPoint = new THREE.Vector2(removeZeroArray[i], removeZeroArray[i + 1]);
    newArray.push(myPoint);
  }
  return newArray;
}

//function wrapper here for our SVGLoader above
var extrudeSVG = function (svgUrl, meshSetting) {
  // load a SVG resource
  loader.load(
    // resource URL
    svgUrl,
    // called when the resource is loaded
    function (data) {

      var paths = data.paths;
      var group = new THREE.Group();
      var scalarSettings;
      
      if (meshSetting !== 'flat') {
        //scale and transform our object to be placed into the front-end Scene
        scalarSettings = 0.6;
        group.position.x = -85;
        group.position.y = 85;

        //we may want logic here later to better handle how thick/tall our
        //3D mesh ends up being
        var extrudeSettings = {
          depth: 10,
          steps: 1,
          bevelEnabled: false,
          bevelThickness: 2,
          bevelSize: 4,
          bevelSegments: 1
        };
      } else {
        //scalar settings from mrDoob's Three examples
        scalarSettings = 0.25;
        group.position.x = -70;
        group.position.y = 70;
      }

      group.scale.multiplyScalar(scalarSettings);

      group.scale.y *= - 1;

      //no matter what, looping through SVG <path /> sections
      for (var i = 0; i < paths.length; i++) {
        var path = paths[i];
        var fillColor = path.userData.style.fill;

        //set and display any fill paths within the SVG file
        if (fillColor !== undefined && fillColor !== 'none') {
          var material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setStyle(fillColor),
            opacity: path.userData.style.fillOpacity,
            transparent: path.userData.style.fillOpacity < 1,
            side: THREE.DoubleSide,
            depthWrite: false

          });

          //create basic Shape objects from our fill paths
          var shapes = path.toShapes(true);
          for (var j = 0; j < shapes.length; j++) {
            var shape = shapes[j];
            var geometry = new THREE.ShapeBufferGeometry(shape);
            var mesh = new THREE.Mesh(geometry, material);
            group.add(mesh);
          }
        }

        //grab 'outline' paths within our SVG
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

          //each path outline has subPaths - this is where we transform into 3D points
          for (var k = 0, kl = path.subPaths.length; k < kl; k++) {
            var strokeGeometry, strokeMesh, threeDGeometry;

            if (meshSetting !== 'flat') {
              if (k < path.subPaths.length) {
                strokeGeometry = new THREE.SVGLoader.pointsToStroke(subPath.getPoints(), path.userData.style);
                //convert stroke BufferGeometry using our helper function
                let wirePoints = arrayToPoints(strokeGeometry.attributes.position.array);
                for (var p = 0; p < wirePoints.length; p += 3) {
                  //create a new fill triangle Shape based on the points extracted from our 
                  //stroke BufferGeometry object
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
              //load flat SVG object - native 0-height rendered object
              if (k < path.subPaths.length) {
                strokeGeometry = new THREE.SVGLoader.pointsToStroke(subPath.getPoints(), path.userData.style);
                if (strokeGeometry) {
                  strokeMesh = new THREE.Mesh(strokeGeometry, strokeMaterial);
                  group.add(strokeMesh);
                }
              }
            }
          }

          return group;
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


//Routes below here
router.get('/', (req, res) => {

  let {file, extrude} = req.params;
  let newMesh = extrudeSVG(`../public/${file}.svg`, `${extrude}`);
  // console.log(file);
  res.status(200).send({
    data: newMesh
  });
});

router.post('/:file', (req, res) => {
  let file = req.params.file;
  let path = __dirname + '/../public/' + file;
  // var regex = /><\/path>/g;
  // let svgStyled = req.body.data.replace(regex, 'style="stroke-width:5></path >"');
  fs.writeFile(path, req.body.data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
    res.send('yep, data passed upward.');
  });
})

module.exports = router;