const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:3000',
		'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
		path.resolve(__dirname, 'src/app.js'),
	],

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react'],
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			}
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin()
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
