import { Raycaster, Vector3 } from 'three';

const raycaster = new Raycaster();
const mouse = new Vector3();

let INTERSECTED;

const onMouseMove = event => {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    mouse.z = 1;
};

window.addEventListener('mousemove', onMouseMove, false);

class Intersections {
    constructor() {
        this.getIntersections = this.getIntersections.bind(this);
    }

    setFromCamera(camera) {
        raycaster.setFromCamera(mouse, camera);
    }

    getIntersections(scene, camera) {
        this.setFromCamera(camera);

        const intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {
            if (intersects[0].object != INTERSECTED) {
                // restore previous intersection object (if it exists) to its original color
                if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
                // store reference to closest object as current intersection object
                INTERSECTED = intersects[0].object;
                // store color of closest object (for later restoration)
                INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                // set a new color for closest object
                INTERSECTED.material.color.setHex(0xffff00);
            }
        } else {
            // restore previous intersection object (if it exists) to its original color
            if (INTERSECTED) {
                INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
            }
            // remove previous intersection object reference
            //     by setting current intersection object to "nothing"
            INTERSECTED = null;
        }
    }
}

export default Intersections;
