import THREE from "../three";

export const exporter = new THREE.STLExporter();

export const onWindowResize = (camera, renderer, threeWidth, threeHeight) => {

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

export const clearThree = (obj, num = 1) => {
  while (obj.children.length > num) {
    clearThree(obj.children[(obj.children.length - 1)])
    obj.remove(obj.children[(obj.children.length - 1)]);
  }
  if (obj.geometry) obj.geometry.dispose()
  // console.log(obj.material)

  if (obj.material !== undefined) {
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

export const scaleGroup = (meshGroup, scalar) => {
  meshGroup.scale.multiplyScalar(scalar);
  //three.js faces "away" from our perspective, so update
  meshGroup.scale.y *= - 1;
}

export const exportASCII = (meshGroup) => {
  const result = exporter.parse(meshGroup);
  // let objectExtension = objectName + '.stl'
  saveString(result, 'thing.stl');
}

export const exportBinary = (scene, link, meshGroup, thingName) => {

  scaleGroup(meshGroup, 0.20);
  meshGroup.updateMatrixWorld(true);
  var result = exporter.parse(meshGroup, { binary: true });
  saveArrayBuffer(link, result, `${thingName}.stl`);
  clearThree(scene, 2);
  // scaleGroup(meshGroup, 6.1);
  // meshGroup.updateMatrixWorld(true);
}

export const saveString = (text, filename) => {
  save(new Blob([text], { type: 'text/plain' }), filename);
}
export const saveArrayBuffer = (link, buffer, filename) => {
  save(link, new Blob([buffer], { type: 'application/octet-stream' }), filename);
}

export const save = (link, blob, filename) => {
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

export const coordinateArrayToVector2TriangleArray = (pointsArray) => {
  const removeZeroArray = pointsArray.filter(point => point !== 0);
  let vector2TriangleArray = [];
  removeZeroArray.forEach((pointCoordinate, index) => {
    if(index % 6 === 0){
      let firstPoint = new THREE.Vector2(pointCoordinate, removeZeroArray[index + 1]);
      let secondPoint = new THREE.Vector2(removeZeroArray[index + 2], removeZeroArray[index + 3]);
      let thirdPoint = new THREE.Vector2(removeZeroArray[index + 4], removeZeroArray[index + 5]);
      vector2TriangleArray.push([firstPoint, secondPoint, thirdPoint]);
    }
  });
  return vector2TriangleArray;
}

export const arrayToPoints = (array) => {
  const removeZeroArray = array.filter(point => {return point !== 0});
  let newArray = [];
  for (var i = 0; i < removeZeroArray.length; i += 2) {
    let myPoint = new THREE.Vector2(removeZeroArray[i], removeZeroArray[i + 1]);
    newArray.push(myPoint);
  }
  return newArray;
}

export const setInitialScale = (group, svgUrl) => {
  let scalarSettings;

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

export const createStampBase = (scene, extrude, shape, group, materialArray, svgUrl) => {

  var boxShape = new THREE.BoxHelper(group, 0xffff00);
  let groupCenterX = boxShape.geometry.boundingSphere.center.x;
  let groupCenterY = boxShape.geometry.boundingSphere.center.y;

  if (extrude && !svgUrl.includes('tiger')) {
    var baseShape;
    if (shape === 'circle') {
      var baseRadius = (1 / group.scale.x) * boxShape.geometry.boundingSphere.radius;
      var baseHeight = 2;
      var baseGeometry = new THREE.CylinderBufferGeometry(baseRadius, baseRadius, baseHeight, 64);
      baseShape = new THREE.Mesh(baseGeometry, materialArray);
      baseShape.position.set((1 / group.scale.x) * (Math.abs(group.position.x) + groupCenterX), -(1 / group.scale.y) * (Math.abs(group.position.y) - groupCenterY), baseHeight / 2);
      baseShape.rotation.set(Math.PI / 2, 0, 0);

    } else if (shape === 'square') {
      baseShape = new THREE.BoxHelper(group, 0xffff00);

    }

    group.add(baseShape);
    scene.updateMatrixWorld(true);
  }
}

export const createBasicMaterial = (color, opacity, transparent) => {
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