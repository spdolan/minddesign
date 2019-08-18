import * as THREE from 'three';

window.THREE = THREE; // THREE.NRRDLoader expects THREE to be a global object
require('three/examples/js/loaders/SVGLoader');
require('three/examples/js/controls/OrbitControls');
require('three/examples/js/exporters/STLExporter.js');
require('three/examples/js/libs/dat.gui.min.js');

export default window.THREE;