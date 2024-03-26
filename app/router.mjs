function failed(path, res) {
	res.writeHead(404);
	res.end(`Have no handler for ${path}`);
}

function route(path, res, handler, payload) {
	console.info(`Routing request for ${path}`);

	let routeFound = typeof handler[path] == 'function' && handler.hasOwnProperty(path);

	return routeFound ? handler[path](res, payload) : failed(path, res);
}

export default route;
