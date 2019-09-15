import PhysicsWorld from 'physics/world';
import RendersWorld from 'renderers/world';

import generateSquareMaze from './utils/maze';
import Controls from 'controls/controls';

let physicsWorld;
let rendersWorld;

let maze = undefined;

let keyAxis = [0, 0];

let gameState = undefined;

// world options
const step = 2;
let mazeDimension = 11;

function gameLoop() {
    switch (gameState) {
        case 'initialize':
            maze = generateSquareMaze(mazeDimension);
            maze[mazeDimension - 1][mazeDimension - 2] = false;

            physicsWorld = new PhysicsWorld(maze);

            rendersWorld.init(maze);

            const level = Math.floor((mazeDimension - 1) / 2 - 4);

            document.querySelector('#level').innerHTML = 'Level ' + level;

            gameState = 'fade in';

            break;

        case 'fade in':
            rendersWorld.addLightIntensity();
            rendersWorld.render();

            rendersWorld.isReady();

            if (rendersWorld.isReady()) {
                gameState = 'play';
            }

            break;

        case 'play':
            physicsWorld.update(keyAxis);

            rendersWorld.update(physicsWorld);
            rendersWorld.render();

            if (rendersWorld.checkVictory()) {
                mazeDimension = rendersWorld.getNewLeveSize();

                gameState = 'fade out';
            }

            break;

        case 'fade out':
            physicsWorld.update(keyAxis);

            rendersWorld.update(physicsWorld);
            rendersWorld.removeLightIntensity();
            rendersWorld.render();

            if (rendersWorld.isReset(true)) {
                gameState = 'initialize';
            }

            break;
    }

    requestAnimationFrame(gameLoop);
}

function onResize() {
    rendersWorld.setRenderSize();
    rendersWorld.setCameraSize();
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


function showHint() {
    document.querySelector('#instructions').style.display = 'block';
}

function hideHint() {
    document.querySelector('#instructions').style.display = 'none';
}

function documentReady(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

documentReady(function() {
    rendersWorld = new RendersWorld();
    //
    document.body.appendChild(rendersWorld.getDomElement());

    const setKeyAxis = value => (keyAxis = value);

    Controls.init(onMoveKey, hideHint, showHint, setKeyAxis);

    // gamepad events
    // todo: make it

    window.addEventListener('resize', onResize);

    // Set the initial game state.
    gameState = 'initialize';

    // Start the game loop.
    requestAnimationFrame(gameLoop);
});
