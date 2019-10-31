import THREE from "../three";
import { arrayToPoints, setInitialScale, createStampBase, createBasicMaterial, coordinateArrayToVector2TriangleArray } from '../services/threeHelpers';

const loader = new THREE.SVGLoader();

const convertPointsToMesh = () => {

}

const createMeshFromShape = (shape, extrude, extrudeSettings = {}, material) => {
  let geometry, mesh;

  if (extrude) {
    geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    mesh = new THREE.Mesh(geometry, material);
  } else {
    geometry = new THREE.ShapeBufferGeometry(shape);
    mesh = new THREE.Mesh(geometry, material); 
  }
  return mesh;
}

export const loadSVG = function (scene, group, svgUrl, extrude) {
  // load a SVG resource
  loader.load(
    // resource URL
    svgUrl,
    // called when the resource is loaded
    function (data) {

      const paths = data.paths;
      group = new THREE.Group();

      const extrudeSettings = {
        depth: 10,
        steps: 1,
        bevelEnabled: false,
        bevelThickness: 2,
        bevelSize: 4,
        bevelSegments: 1
      };

      setInitialScale(group, svgUrl);

      for (let i = 0; i < paths.length; i++) {
        //let's add our printing base here!

        const path = paths[i];
        const fillColor = path.userData.style.fill;

        if (fillColor !== undefined && fillColor !== 'none') {
          const material = createBasicMaterial(fillColor, path.userData.style.fillOpacity, path.userData.style.fillOpacity < 1);
          const shapes = path.toShapes(true);
          for (let j = 0; j < shapes.length; j++) {
            const shape = shapes[j];
            const shapeMesh = createMeshFromShape(shape, extrude, extrudeSettings, material);
            group.add(shapeMesh);
          }
        }

        const strokeColor = path.userData.style.stroke;
        if (strokeColor !== undefined && strokeColor !== 'none') {
          var strokeMaterial = createBasicMaterial(strokeColor, path.userData.style.strokeOpacity, path.userData.style.strokeOpacity < 1);

          for (let k = 0; k < path.subPaths.length; k++) {
            const subPath = path.subPaths[k];
            let strokeMesh, threeDGeometry;
            let strokeGeometry = new THREE.SVGLoader.pointsToStroke(subPath.getPoints(), path.userData.style);
            if (extrude) {
              const wireTriangles = coordinateArrayToVector2TriangleArray(strokeGeometry.attributes.position.array);
              // eslint-disable-next-line no-loop-func
              wireTriangles.forEach((vectorTriangle) => {
                const newGeometry = new THREE.Shape(vectorTriangle);
                threeDGeometry = new THREE.ExtrudeBufferGeometry(newGeometry, extrudeSettings);
                strokeMesh = new THREE.Mesh(threeDGeometry, strokeMaterial);
                group.add(strokeMesh);
              });
            }
            else {
              strokeMesh = new THREE.Mesh(strokeGeometry, strokeMaterial);
              group.add(strokeMesh);
            }
            
          }

          scene.add(group);
        }
      }

      //place cylinder material here
      const baseMaterial = createBasicMaterial(0x00ffff, 0.3, true);
      //add our base helper with array of materials
      createStampBase(scene, extrude, 'circle', group, [strokeMaterial, baseMaterial], svgUrl)
      // createStampBase(extrude, 'square', group, [strokeMaterial, baseMaterial], svgUrl)
    },
    // called when loading is in progresses
    function (xhr) {
      // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      if (xhr.lengthComputable) {
        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log(Math.round(percentComplete, 2) + '% rendered');
      }

    },
    // called when loading has errors
    function (error) {

      console.log('An error happened');

    }
  );
}