import {
    TextureLoader,
    LinearFilter,
    Geometry,
    CubeGeometry,
    Mesh,
    MeshPhongMaterial,
} from 'three';

const brickTexture = new TextureLoader().load('/textures/brick.jpg');

brickTexture.minFilter = LinearFilter;

const Maze = {
    init(maze) {
        return this.generateMazeMesh(maze);
    },

    generateMazeMesh(field) {
        const dummy = new Geometry();

        for (let i = 0; i < field.dimension; i++) {
            for (let j = 0; j < field.dimension; j++) {
                if (field[i][j]) {
                    const geometry = new CubeGeometry(1, 1, 1, 1, 1, 1);
                    const mesh = new Mesh(geometry);
                    mesh.position.x = i;
                    mesh.position.y = j;
                    mesh.position.z = 0.5;
                    mesh.updateMatrix();

                    dummy.merge(mesh.geometry, mesh.matrix);
                }
            }
        }
        const material = new MeshPhongMaterial({ map: brickTexture });
        const mesh = new Mesh(dummy, material);

        return mesh;
    },
};

export default Maze;
