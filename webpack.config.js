const path = require('path');

// for analysis only
// const { BundleStatsWebpackPlugin } = require('bundle-stats');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    mode: 'production',
    plugins: [
        new CompressionPlugin(),
        // new BundleStatsWebpackPlugin(),
        // new BundleAnalyzerPlugin({
        //     generateStatsFile: true,
        // }),
    ],
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