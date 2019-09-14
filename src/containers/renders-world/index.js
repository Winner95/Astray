import * as THREE from 'three';
import Ball from '../../mesh/ball/ball';
import Plane from '../../mesh/ground/ground';
import Maze from '../../mesh/maze/maze';

class RendersWorld {
    constructor() {
        this.renderer = new THREE.WebGLRenderer();
        this.setRenderSize();
    }

    init(maze) {

    }

    update() {

    }

    show() {

    }

    hide() {

    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    setRenderSize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    getDomElement() {
        return this.renderer.domElement;
    }

}

export default RendersWorld;
