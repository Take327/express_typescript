const path = require('path');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');//LICENSE.txtを出力しないようにする。
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    target: 'node',
    devtool: 'inline-source-map',
    //起点となるファイル
    entry: {
        'index': path.join(__dirname, 'src/index.ts'),
    },
    //出力の設定
    output: {
        path: path.join(__dirname, 'dist'), //出力左記のフォルダ名を設定する
        filename: '[name].js', //jsファイルのファイル名を指定する [name]とするとentryのキーでjsファイルを作成する
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.node$/,
                loader: 'node-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    // publicディレクトリに配置する静的リソースやmanifest.json等を移送する
    plugins: [
        //CopyWebpackPlugin ビルド時にコピーするプラグイン
        new CopyWebpackPlugin({ patterns: [{ from: 'public/main.bat', to: '' }] }),
        new CopyWebpackPlugin({ patterns: [{ from: 'public/start.vbs', to: '' }] }),
        new Dotenv(),
    ],
    externals: {
        sqlite3: 'commonjs sqlite3',
    },
    //LICENSE.txtを出力しないようにする。
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
};
