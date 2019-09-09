import * as THREE from 'three';

const ironTexture = new THREE.TextureLoader().load('/textures/wood.jpg');

ironTexture.minFilter = THREE.LinearFilter;

export const ballRadius = 0.25;

const Ball = {
    init() {
        const g = new THREE.SphereGeometry(ballRadius, 32, 16);
        const m = new THREE.MeshPhongMaterial({ map: ironTexture });
        const ballMesh = new THREE.Mesh(g, m);

        ballMesh.position.set(1, 1, ballRadius);

        return ballMesh;
    },
};

export default Ball;
