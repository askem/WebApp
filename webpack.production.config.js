const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: 'source-map',

	entry: [
		path.resolve(__dirname, 'src/app.js')
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
				loader: 'babel',
				query: { presets: [ 'es2015', 'react' ] }
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			}
		]
	},

	plugins:[
	    new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': JSON.stringify('production')
			}
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
