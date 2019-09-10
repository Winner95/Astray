const inputs = require('game-inputs')();
const annyang = require('annyang');

class Input {
    constructor(keyEvents, mouseEvents, touchEvents, voiceEvents) {
        this.keyboardInit(keyEvents);
        this.mouseInit(mouseEvents);
        this.touchInit(touchEvents);
        this.voiceInit(voiceEvents);
    }

    keyboardInit(keyEvents) {
        keyEvents.forEach(item => {
            inputs.bind(...item.bindings);

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

    voiceInit(voiceEvents) {
        // SpeechKITT.vroom();
        if (annyang) {
            voiceEvents.forEach(item => {
                const command = {
                    [item.bindings[0]]: () => {
                        item.callback();
                        // item.upCallback();
                    },
                };

                annyang.addCommands(command);
            });
            ;

            annyang.start();
        }

    }
}

module.exports = Input;
