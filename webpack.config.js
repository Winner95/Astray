const path = require('path');

module.exports = {
    resolve: {
        alias: {
            physics: path.resolve(__dirname, "src/physics"),
            mesh: path.resolve(__dirname, "src/mesh"),
            utils: path.resolve(__dirname, "src/utils"),
        }
    }
};