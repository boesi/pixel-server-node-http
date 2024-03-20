import http from 'http';
const hostname = 'localhost';
const port = 3001;

const server = http.createServer((req, res) => {
	console.log('we have a request');
	res.writeHead(200, {
		'Content-Type': 'text/plain',
	});
	res.end('Hello World');
});

server.listen(port, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
