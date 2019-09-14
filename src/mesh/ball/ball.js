import { TextureLoader, LinearFilter, SphereGeometry, MeshPhongMaterial, Mesh } from 'three';

const ironTexture = new TextureLoader().load('/textures/wood.jpg');

ironTexture.minFilter = LinearFilter;

export const ballRadius = 0.25;

const Ball = {
    init() {
        const g = new SphereGeometry(ballRadius, 32, 16);
        const m = new MeshPhongMaterial({ map: ironTexture });
        const ballMesh = new Mesh(g, m);

        ballMesh.position.set(1, 1, ballRadius);

        return ballMesh;
    },
};

export default Ball;
