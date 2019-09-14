import jQuery from 'jquery'; // todo: remove

import PhysicsWorld from './physics/world';
import RendersWorld from './containers/renders-world';

import generateSquareMaze from './utils/maze';
import Controls from './containers/controls/controls';

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
            jQuery('#level').html('Level ' + level);

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

    rendersWorld = new RendersWorld();
    //
    document.body.appendChild(rendersWorld.getDomElement());

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
