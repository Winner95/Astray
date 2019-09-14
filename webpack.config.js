const path = require('path');

module.exports = {
    resolve: {
        alias: {
            physics: path.resolve(__dirname, "src/physics"),
            renderers: path.resolve(__dirname, "src/renderers"),
            mesh: path.resolve(__dirname, "src/mesh"),
            controls: path.resolve(__dirname, "src/controls"),
            utils: path.resolve(__dirname, "src/utils"),
        }
    }
};