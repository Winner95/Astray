import jQuery from 'jquery'; // todo: remove
import * as THREE from 'three';
import PhysicsWorld from './containers/physics-world';
import generateSquareMaze from './utils/maze';
import Controls from './containers/controls/controls';
import Ball, { ballRadius } from './mesh/ball/ball';
import Plane from './mesh/ground/ground';
import Maze from './mesh/maze/maze';

let physicsWorld;

let camera = undefined;
let scene = undefined;
let renderer = undefined;
let light = undefined;
let maze = undefined;
let mazeMesh = undefined;
let mazeDimension = 11;
let planeMesh = undefined;
let ballMesh = null;

let keyAxis = [0, 0];

let gameState = undefined;

// Box2D world variables
const step = 2;

function createRenderWorld() {
    // Create the scene object.
    scene = new THREE.Scene();

    // Add the ball.
    ballMesh = Ball.init();

    scene.add(ballMesh);

    // Add the maze.
    mazeMesh = Maze.init(maze);
    scene.add(mazeMesh);

    // Add the ground.
    planeMesh = Plane.init(mazeDimension);
    scene.add(planeMesh);

    // Add the camera.
    const aspect = window.innerWidth / window.innerHeight;

    camera = new THREE.PerspectiveCamera(60, aspect, 1, 1000);
    camera.position.set(1, 1, 5);

    scene.add(camera);

    // Add the light.
    light = new THREE.PointLight(0xffffff, 1);
    light.position.set(1, 1, 1.3);
    scene.add(light);
}

function updateRenderWorld() {
    // Update ball position.
    const stepX = physicsWorld.getPlayerShape().GetPosition().x - ballMesh.position.x;
    const stepY = physicsWorld.getPlayerShape().GetPosition().y - ballMesh.position.y;
    ballMesh.position.x += stepX;
    ballMesh.position.y += stepY;

    // Update ball rotation.
    let tempMat = new THREE.Matrix4();
    tempMat.makeRotationAxis(new THREE.Vector3(0, 1, 0), stepX / ballRadius);
    tempMat.multiply(ballMesh.matrix);
    ballMesh.matrix = tempMat;
    tempMat = new THREE.Matrix4();
    tempMat.makeRotationAxis(new THREE.Vector3(1, 0, 0), -stepY / ballRadius);
    tempMat.multiply(ballMesh.matrix);
    ballMesh.matrix = tempMat;
    ballMesh.rotation.setFromRotationMatrix(ballMesh.matrix);

    // Update camera and light positions.
    camera.position.x += (ballMesh.position.x - camera.position.x) * 0.1;
    camera.position.y += (ballMesh.position.y - camera.position.y) * 0.1;
    camera.position.z += (5 - camera.position.z) * 0.1;
    light.position.x = camera.position.x;
    light.position.y = camera.position.y;
    light.position.z = camera.position.z - 3.7;
}

function gameLoop() {
    switch (gameState) {
        case 'initialize':
            maze = generateSquareMaze(mazeDimension);
            maze[mazeDimension - 1][mazeDimension - 2] = false;
            physicsWorld = new PhysicsWorld(maze);
            createRenderWorld();
            camera.position.set(1, 1, 5);
            light.position.set(1, 1, 1.3);
            light.intensity = 0;
            const level = Math.floor((mazeDimension - 1) / 2 - 4);
            jQuery('#level').html('Level ' + level);
            gameState = 'fade in';
            break;

        case 'fade in':
            light.intensity += 0.1 * (1.0 - light.intensity);
            renderer.render(scene, camera);
            if (Math.abs(light.intensity - 1.0) < 0.05) {
                light.intensity = 1.0;
                gameState = 'play';
            }
            break;

        case 'play':
            physicsWorld.update(keyAxis);
            updateRenderWorld();
            renderer.render(scene, camera);

            // Check for victory.
            const mazeX = Math.floor(ballMesh.position.x + 0.5);
            const mazeY = Math.floor(ballMesh.position.y + 0.5);
            if (mazeX == mazeDimension && mazeY == mazeDimension - 2) {
                mazeDimension += 2;
                gameState = 'fade out';
            }
            break;

        case 'fade out':
            physicsWorld.update(keyAxis);
            updateRenderWorld();
            light.intensity += 0.1 * (0.0 - light.intensity);
            renderer.render(scene, camera);
            if (Math.abs(light.intensity - 0.0) < 0.1) {
                light.intensity = 0.0;
                renderer.render(scene, camera);
                gameState = 'initialize';
            }
            break;
    }

    requestAnimationFrame(gameLoop);
}

function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function onMoveKey(event) {
    if (event.type === 'keyup') {
        keyAxis = [0, 0];

        return;
    }

    if (event.keyCode == 39) {
        keyAxis = [step, 0];
    } else if (event.keyCode == 37) {
        keyAxis = [-step, 0];
    }
    if (event.keyCode == 40) {
        keyAxis = [0, -step];
    } else if (event.keyCode == 38) {
        keyAxis = [0, step];
    }
}

jQuery.fn.centerv = function() {
    const wh = window.innerHeight;
    const h = this.outerHeight();
    this.css('position', 'absolute');
    this.css('top', Math.max(0, (wh - h) / 2) + 'px');
    return this;
};

jQuery.fn.centerh = function() {
    const ww = window.innerWidth;
    const w = this.outerWidth();
    this.css('position', 'absolute');
    this.css('left', Math.max(0, (ww - w) / 2) + 'px');
    return this;
};

jQuery.fn.center = function() {
    this.centerv();
    this.centerh();
    return this;
};

function showHint() {
    jQuery('#instructions').show();
}

function hideHint() {
    jQuery('#instructions').hide();
}

jQuery(document).ready(function() {
    // Prepare the instructions.
    jQuery('#instructions').center();
    hideHint();

    //

    // Create the renderer.
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // todo: add styles to it
    document.body.appendChild(renderer.domElement);

    const setKeyAxis = value => (keyAxis = value);

    Controls.init(onMoveKey, hideHint, showHint, setKeyAxis);

    // gamepad events
    // todo: make it

    jQuery(window).resize(onResize);

    // Set the initial game state.
    gameState = 'initialize';

    // Start the game loop.
    requestAnimationFrame(gameLoop);
});
