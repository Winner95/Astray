import * as THREE from 'three';

const planeTexture = new THREE.TextureLoader().load('/textures/floor.jpg');

planeTexture.minFilter = THREE.LinearFilter;
planeTexture.wrapS = planeTexture.wrapT = THREE.RepeatWrapping;

const Plane = {
    init(mazeDimension) {
        planeTexture.repeat.set(mazeDimension * 5, mazeDimension * 5);

        const g = new THREE.PlaneGeometry(
            mazeDimension * 10,
            mazeDimension * 10,
            mazeDimension,
            mazeDimension
        );
        const m = new THREE.MeshPhongMaterial({ map: planeTexture });
        const planeMesh = new THREE.Mesh(g, m);

        planeMesh.position.set((mazeDimension - 1) / 2, (mazeDimension - 1) / 2, 0);

        return planeMesh;
    },
};

export default Plane;
