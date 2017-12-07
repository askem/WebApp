#!/usr/bin/env python
import BaseHTTPServer
import os

PORT_NUMBER = 1235

class Handler( BaseHTTPServer.BaseHTTPRequestHandler ):
    def do_GET( self ):
		staticFile = False
		filePath = self.path.split('?', 1)[0]
		if filePath.endswith(".html"):
			mimetype='text/html'
			staticFile = True
		if filePath.endswith(".jpg"):
			mimetype='image/jpeg'
			staticFile = True
		if filePath.endswith(".png"):
			mimetype='image/png'
			staticFile = True
		if filePath.endswith(".gif"):
			mimetype='image/gif'
			staticFile = True
		if filePath.endswith(".js") or filePath.endswith(".map"):
			mimetype='application/javascript'
			staticFile = True
		if filePath.endswith(".css"):
			mimetype='text/css'
			staticFile = True
		if filePath.endswith(".ico"):
			mimetype='image/x-icon'
			staticFile = True

		if staticFile == False:
			mimetype = 'text/html'
			filePath = "quote.html"

		self.send_response(200)
		self.send_header( 'Content-type', mimetype )
		self.end_headers()
		f = open('dist/' + filePath)
		self.wfile.write(f.read())
		f.close()
try:
	print 'Serving on http://127.0.0.1:'+str(PORT_NUMBER)
	httpd = BaseHTTPServer.HTTPServer( ('127.0.0.1', PORT_NUMBER), Handler )
	#os.system('open http://127.0.0.1:'+str(PORT_NUMBER))
	httpd.serve_forever()
	
except KeyboardInterrupt:
	httpd.socket.close()
