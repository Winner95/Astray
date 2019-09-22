const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const trackingID = process.env.googleID ? process.env.googleID : 'your-tracking-app-ID';

// for analysis only
// const { BundleStatsWebpackPlugin } = require('bundle-stats');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'production',
    plugins: [
        new CopyPlugin([
            { from: 'src/textures', to: 'textures' },
            { from: 'src/manifest.json', to: 'manifest.json' },
        ]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.ejs'),
            templateParameters: {
                'title': 'Astray Game',
                'trackingID': trackingID
              },
        }),
        new HtmlReplaceWebpackPlugin([
            {
              pattern: 'your-tracking-app-ID',
              replacement: trackingID
            },

        ]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i
        }),
        new CompressionPlugin(),
        new OfflinePlugin({
            ServiceWorker: {
                entry: path.resolve(__dirname, 'src/sw.js'),
            }
        }),
        // new BundleStatsWebpackPlugin(),
        // new BundleAnalyzerPlugin({
        //     generateStatsFile: true,
        // }),
    ],
    resolve: {
        alias: {
            controls: path.resolve(__dirname, "src/controls"),
            mesh: path.resolve(__dirname, "src/mesh"),
            physics: path.resolve(__dirname, "src/physics"),
            renderers: path.resolve(__dirname, "src/renderers"),
            storage: path.resolve(__dirname, "src/storage"),
            utils: path.resolve(__dirname, "src/utils"),
        }
    }
};