import * as THREE from 'three';

window.THREE = THREE; // THREE.NRRDLoader expects THREE to be a global object
require('three/examples/js/loaders/SVGLoader');
require('three/examples/js/controls/OrbitControls');
require('three/examples/jsm/libs/dat.gui.module');

export default window.THREE;