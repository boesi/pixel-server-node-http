function failed(request, response) {
	console.error(`No path found for method ${request.method} and url ${request.url}`);
	response.writeHead(404);
	response.end(`Have no handler for method ${request.method} and url ${request.url}`);
}

function route(request, response, handler, payload) {
	const url = new URL(request.url, `http://${request.headers.host}`);
	const key = `${request.method} ${url.pathname}`;
	console.info(`Routing request for key ${key}`);
	let routeFound = typeof handler[key] == 'function' && handler.hasOwnProperty(key);

	return routeFound ? handler[key](response, url.searchParams, payload) : failed(request, response);
}

export default route;
