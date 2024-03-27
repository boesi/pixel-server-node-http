function failed(request, response) {
	console.error(`No path found for ${request.url}`);
	res.writeHead(404);
	res.end(`Have no handler for ${request.url}`);
}

function route(request, response, handler, payload) {
	console.info(`Routing request for ${request.url}`);

	let routeFound = typeof handler[request.url] == 'function' && handler.hasOwnProperty(request.url);

	return routeFound ? handler[request.url](response, payload) : failed(request, response);
}

export default route;
