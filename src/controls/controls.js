import Input from 'utils/input/input';
import { setRoundedValue } from 'utils/math/math';

const controls = {
    init: (onMoveKey, hideHint, showHint, setKeyAxis) => {
        const keyEvents = [
            {
                bindings: ['toggle-info', 'I'],
                callback: () => showHint(),
                upCallback: () => hideHint(),
            },
            {
                bindings: ['move-left', 'A', '<left>'],
                callback: event => onMoveKey(event),
                upCallback: event => onMoveKey(event),
            },
            {
                bindings: ['move-right', 'D', '<right>'],
                callback: event => onMoveKey(event),
                upCallback: event => onMoveKey(event),
            },
            {
                bindings: ['move-down', 'S', '<down>'],
                callback: event => onMoveKey(event),
                upCallback: event => onMoveKey(event),
            },
            {
                bindings: ['move-up', 'W', '<up>'],
                callback: event => onMoveKey(event),
                upCallback: event => onMoveKey(event),
            },
        ];

        const mouseEvents = {
            move: (x, y) => {
                const coordX = x;
                const coordY = y;
                let newX = 0;
                let newY = 0;

                if (coordX > 0) {
                    newX = 1;
                } else if (coordX < 0) {
                    newX = -1;
                }

                if (coordY > 0) {
                    newY = -1;
                } else if (coordY < 0) {
                    newY = 1;
                }

                setKeyAxis([newX, newY]);
            },
            end: () => {
                setKeyAxis([0, 0]);
            },
        };

        const touchEvents = {
            move: (x, y) => {
                const coordX = setRoundedValue(x / window.devicePixelRatio);
                const coordY = setRoundedValue(y / window.devicePixelRatio);
                let newX = 0;
                let newY = 0;

                if (coordX > 0) {
                    newX = 1;
                } else if (coordX < 0) {
                    newX = -1;
                }

                if (coordY > 0) {
                    newY = -1;
                } else if (coordY < 0) {
                    newY = 1;
                }

                setKeyAxis([newX, newY]);
            },
            end: () => {
                setKeyAxis([0, 0]);
            },
        };

        new Input(keyEvents, mouseEvents, touchEvents);
    },
};

export default controls;
