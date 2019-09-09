import * as THREE from 'three';

const brickTexture = new THREE.TextureLoader().load('/textures/brick.png');

brickTexture.minFilter = THREE.LinearFilter;

const Maze = {
    init(maze) {
        return this.generateMazeMesh(maze);
    },

    generateMazeMesh(field) {
        const dummy = new THREE.Geometry();

        for (let i = 0; i < field.dimension; i++) {
            for (let j = 0; j < field.dimension; j++) {
                if (field[i][j]) {
                    const geometry = new THREE.CubeGeometry(1, 1, 1, 1, 1, 1);
                    const mesh = new THREE.Mesh(geometry);
                    mesh.position.x = i;
                    mesh.position.y = j;
                    mesh.position.z = 0.5;
                    mesh.updateMatrix();

                    dummy.merge(mesh.geometry, mesh.matrix);
                }
            }
        }
        const material = new THREE.MeshPhongMaterial({ map: brickTexture });
        const mesh = new THREE.Mesh(dummy, material);

        return mesh;
    },
};

export default Maze;
