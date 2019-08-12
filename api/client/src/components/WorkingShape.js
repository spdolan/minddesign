import React, { Component } from 'react';
// import {  } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import THREE from "../three";


class WorkingShape extends Component {
  componentDidMount() {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, ((window.innerWidth * 0.5) - (window.innerWidth * 0.1)) / ((window.innerHeight * 0.5)), 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(((window.innerWidth * 0.5) - (window.innerWidth * 0.1)), ((window.innerHeight * 0.5)));
    // document.body.appendChild( renderer.domElement );
    // // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(3, 3, 3);
    var material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // === THREE.JS EXAMPLE CODE END ===
  }

  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
}

function mapStateToProps(state) {
  return {
    // products: state.products,
    // categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(null, null)(WorkingShape);