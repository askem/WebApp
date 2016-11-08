const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const port = 3000;

new WebpackDevServer(webpack(config), {
	contentBase: 'dist',
	publicPath: config.output.publicPath,
	hot: true,
	host: '0.0.0.0',
	historyApiFallback: {
		index: '/quote.html'
	},
	quiet: true,
	
	// For corrupt file watchers
	watchOptions: {
	    poll: 1000 
	},
	
	
}).listen(port, 'localhost', (err, result) => {
	if (err) {
		return console.log(err);
	}
	console.log(`Listening at http://localhost:${port}/`);
});
