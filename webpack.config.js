const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'src/app.js'),

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: { presets: [ 'es2015', 'react' ] }
			}
		]
	},

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
