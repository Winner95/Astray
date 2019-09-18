import GameInputs from 'game-inputs';

const inputs = new GameInputs();

class Input {
    constructor(keyEvents, mouseEvents, touchEvents) {
        if ('ontouchstart' in document.documentElement) {
            this.touchInit(touchEvents);
        } else {
            this.keyboardInit(keyEvents);
            this.mouseInit(mouseEvents);
        }
    }

    keyboardInit(keyEvents) {
        keyEvents.forEach(item => {
            inputs.bind.apply(inputs, item.bindings);

            inputs.down.on(item.bindings[0], () => {
                item.callback(event);
            });

            inputs.up.on(item.bindings[0], event => {
                if (item.upCallback) {
                    item.upCallback(event);
                } else {
                    item.callback(event);
                }
            });
        });
    }

    mouseInit(mouseEvents) {
        const mouseMoveHandler = () => {
            mouseEvents.move(inputs.state.dx, inputs.state.dy);
        };

        const mouseEndHandler = () => {
            mouseEvents.end();
        };

        inputs.bind('fire', '<mouse 1>');

        inputs.down.on('fire', mouseMoveHandler);
        inputs.up.on('fire', mouseEndHandler);
    }

    touchInit(touchEvents) {
        const touchMoveHandler = () => {
            touchEvents.move(inputs.state.dx, inputs.state.dy);
        };

        const touchEndHandler = () => {
            touchEvents.end();

            inputs.tick();
        };

        document.addEventListener('touchmove', touchMoveHandler);
        document.addEventListener('touchend', touchEndHandler);
    }
}

export default Input;
