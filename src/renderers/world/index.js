import { WebGLRenderer, Scene, PerspectiveCamera, PointLight, Matrix4, Vector3 } from 'three';

import Ball, { ballRadius } from 'mesh/ball/ball';
import Plane from 'mesh/ground/ground';
import Maze from 'mesh/maze/maze';

const abs = Math.abs;

class RendersWorld {
    constructor() {
        this.renderer = new WebGLRenderer();
        this.setAspectRatio();
        this.setRenderSize();
    }

    init(maze) {
        this.maze = maze;
        this.scene = new Scene();

        this.ballMesh = Ball.init();
        this.scene.add(this.ballMesh);

        const mazeMesh = Maze.init(this.maze);
        this.scene.add(mazeMesh);

        const planeMesh = Plane.init(this.maze.dimension);
        this.scene.add(planeMesh);

        this.camera = new PerspectiveCamera(60, this.aspect, 1, 1000);
        this.camera.position.set(1, 1, 5);
        this.scene.add(this.camera);

        this.light = new PointLight(0xffffff, 1);
        this.light.position.set(1, 1, 1.3);
        this.scene.add(this.light);

        this.camera.position.set(1, 1, 5);
        this.light.position.set(1, 1, 1.3);

        this.light.intensity = 0;
    }

    update(physicsWorld) {
        // Update ball position.
        const stepX = physicsWorld.getPlayerShape().GetPosition().x - this.ballMesh.position.x;
        const stepY = physicsWorld.getPlayerShape().GetPosition().y - this.ballMesh.position.y;

        this.ballMesh.position.x += stepX;
        this.ballMesh.position.y += stepY;

        // Update ball rotation.
        let tempMat = new Matrix4();

        tempMat.makeRotationAxis(new Vector3(0, 1, 0), stepX / ballRadius);
        tempMat.multiply(this.ballMesh.matrix);

        this.ballMesh.matrix = tempMat;

        tempMat = new Matrix4();
        tempMat.makeRotationAxis(new Vector3(1, 0, 0), -stepY / ballRadius);
        tempMat.multiply(this.ballMesh.matrix);

        this.ballMesh.matrix = tempMat;
        this.ballMesh.rotation.setFromRotationMatrix(this.ballMesh.matrix);

        this.camera.position.x += (this.ballMesh.position.x - this.camera.position.x) * 0.1;
        this.camera.position.y += (this.ballMesh.position.y - this.camera.position.y) * 0.1;
        this.camera.position.z += (5 - this.camera.position.z) * 0.1;

        this.light.position.x = this.camera.position.x;
        this.light.position.y = this.camera.position.y;
        this.light.position.z = this.camera.position.z - 3.7;
    }

    checkVictory() {
        const mazeX = Math.floor(this.ballMesh.position.x + 0.5);
        const mazeY = Math.floor(this.ballMesh.position.y + 0.5);
        const condition = mazeX == this.maze.dimension && mazeY == this.maze.dimension - 2;

        if (condition) {
            this.setNewLevelSize();
        }

        return condition;
    }

    isReady() {
        if (abs(this.light.intensity - 1.0) < 0.05) {
            this.light.intensity = 1.0;

            return true;
        }

        return false;
    }

    isReset(reset) {
        if (abs(this.light.intensity - 0.0) < 0.1) {
            this.light.intensity = 0.0;
            this.render();

            return reset;
        }

        return false;
    }

    setNewLevelSize() {
        this.mazeDimension = this.maze.dimension += 2;
    }

    getNewLeveSize() {
        return this.mazeDimension;
    }

    addLightIntensity() {
        this.light.intensity += 0.1 * (1.0 - this.light.intensity);
    }

    removeLightIntensity() {
        this.light.intensity += 0.1 * (0.0 - this.light.intensity);
    }

    getLightIntensity() {
        return this.light.intensity;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    setRenderSize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    setCameraSize() {
        this.setAspectRatio();
        this.camera.aspect = this.aspect;
        this.camera.updateProjectionMatrix();
    }

    setAspectRatio() {
        this.aspect = window.innerWidth / window.innerHeight;
    }

    getDomElement() {
        return this.renderer.domElement;
    }
}

export default RendersWorld;
