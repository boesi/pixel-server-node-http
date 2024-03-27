import http from 'http';
const port = 3001;

function start(route, handler) {
	function handleReq(req, res) {
		let payload = '';

		req.on('data', chunk => payload += chunk);

		req.on('end', () => route(req, res, handler, payload));
	}

	http.createServer(handleReq).listen(port, () => console.info(`PM-Server running on port ${port}`));
}

export default start;
