const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');

const trackingID = process.env.googleID ? process.env.googleID : 'your-tracking-app-ID';
// for analysis only
// const { BundleStatsWebpackPlugin } = require('bundle-stats');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin(),
        new HtmlReplaceWebpackPlugin([
            {
              pattern: 'your-tracking-app-ID',
              replacement: trackingID
            },

        ]),
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