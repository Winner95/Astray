import {
    TextureLoader,
    LinearFilter,
    RepeatWrapping,
    PlaneGeometry,
    MeshPhongMaterial,
    Mesh,
} from 'three';

const planeTexture = new TextureLoader().load('/textures/floor.jpg');

planeTexture.minFilter = LinearFilter;
planeTexture.wrapS = planeTexture.wrapT = RepeatWrapping;

const Plane = {
    init(mazeDimension) {
        planeTexture.repeat.set(mazeDimension * 5, mazeDimension * 5);

        const g = new PlaneGeometry(
            mazeDimension * 10,
            mazeDimension * 10,
            mazeDimension,
            mazeDimension
        );
        const m = new MeshPhongMaterial({ map: planeTexture });
        const planeMesh = new Mesh(g, m);

        planeMesh.position.set((mazeDimension - 1) / 2, (mazeDimension - 1) / 2, 0);

        return planeMesh;
    },
};

export default Plane;
