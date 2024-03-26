import http from 'http';
const port = 3001;

function start(route, handler) {
	function handleReq(req, res) {
		let payload = '';

		req.on('data', chunk => payload += chunk);

		req.on('end', () => route(req.url, res, handler, payload));
	}

	http.createServer(handleReq).listen(port, () => console.info(`PM-Server running on port ${port}`));
}

// const server = http.createServer((req, res) => {
// 	console.log('we have a request');
// 	res.writeHead(200, {
// 		'Content-Type': 'text/plain',
// 	});
// 	res.end('Hello World');
// });

// server.listen(port, () => {
// 	console.log(`Server running at ${port} in directory ${__dirname}`);
// });

export default start;
