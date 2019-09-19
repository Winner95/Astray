import { Font, TextGeometry, Mesh, MeshPhongMaterial } from 'three';
import helvetikerBold from 'three/examples/fonts/helvetiker_bold.typeface.json';

class MenuItem {
    constructor(itemName, size, height, position) {
        const textGeometry = new TextGeometry(itemName, {
            font: new Font(helvetikerBold),
            size,
            height,
            curveSegments: 1,
            bevelThickness: 0.5,
            bevelSize: 0.5,
            bevelEnabled: true,
        });

        textGeometry.computeBoundingBox();
        textGeometry.computeVertexNormals();
        textGeometry.set;

        const textMaterial = new MeshPhongMaterial({
            color: 0xff0000,
            specular: 0xffffff,
        });

        let mesh = new Mesh(textGeometry, textMaterial);

        mesh.position.set(...position);
        mesh.scale.set(0.01, 0.01, 0.01);

        return mesh;
    }
}

export default MenuItem;
