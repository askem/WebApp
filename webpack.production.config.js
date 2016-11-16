'use strict';
const path = require('path');
const webpack = require('webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');
const distPath = path.resolve(__dirname, 'dist');

let config = {
	devtool: 'cheap-module-source-map',

	entry: {
		bundle: ['babel-polyfill', path.resolve(__dirname, 'src/app.js')],
		quote:  ['babel-polyfill', path.resolve(__dirname, 'src/quote.js')]
	},

	output: {
		path: distPath,
		filename: '[name].js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				//exclude: /node_modules/,
				loader: 'babel',
				query: { presets: [ 'es2015', 'react' ] }
			},
			{
				test: /\.scss$/,
				loader: extractTextPlugin.extract('css!sass')
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			},
			{
				test: /\.png$/,
				loader: "url-loader?limit=100000"
			}
		]
	},

	plugins:[
	    new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': JSON.stringify('production')
			},
			__DEV__: false,
			__PRODUCTION__: true,
			__API_ROOT__: JSON.stringify('https://api.askem.com/0/'),
		}),
		new webpack.ProvidePlugin({
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		}),
		//new extractTextPlugin(`${distPath}/css/quote.css`, {
		new extractTextPlugin('css/[name].css', {
			allChunks: true
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress:{
				warnings: true
			}
		})
	],

	// For XLSX : See https://github.com/SheetJS/js-xlsx/issues/285
	node: {
		fs: 'empty'
	},
	externals: [
		{ './cptable': 'var cptable' },
		{'./jszip': 'jszip'}
	],

	// http://moduscreate.com/es6-es2015-import-no-relative-path-webpack/
	resolve: {
		root: [
    		path.resolve(__dirname, 'src')
		]
	}
};

const entryPoint = process.env.ENTRY_POINT;
if (entryPoint) {
	console.info(`Only using entry point: ${entryPoint}`);
	config.entry = {
		[entryPoint]: config.entry[entryPoint]
	}
};

module.exports = config;
