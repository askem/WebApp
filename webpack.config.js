const path = require('path');
const webpack = require('webpack');

const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();

module.exports = {
	entry: {
		bundle: [
			'webpack-dev-server/client?http://0.0.0.0:3000',
			'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
			path.resolve(__dirname, 'src/app.js'),
		],
		quote: [
			'webpack-dev-server/client?http://0.0.0.0:3000',
			'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
			path.resolve(__dirname, 'src/quote.js'),
		]
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: [
					'react-hot',
					'babel?plugins[]=transform-es2015-modules-commonjs,presets[]=react'
				],
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
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

	plugins: [
		new webpack.ProvidePlugin({
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		}),
		new webpack.DefinePlugin({
			__DEV__: true,
			__PRODUCTION__: false,
			__API_ROOT__: JSON.stringify('https://3po.askem.com/0/'),
		}),
		new DashboardPlugin(dashboard.setData),
		new webpack.HotModuleReplacementPlugin()
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
		// modules: [
		// 	path.resolve(__dirname, 'src'),
		// 	'node_modules'
		// ]
		root: [
    		path.resolve(__dirname, 'src')
		]
	}
};
