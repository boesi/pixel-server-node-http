const handler = {
	'GET /': getNames,
	'GET /item': loadItem,
	'PUT /item': saveItem,
	'DELETE /item': deleteItem,
};

function getNames(res) {
	console.info('Handler getNames');
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify({names: []}));
	res.end();
}

function loadItem(res, name) {
	console.info(`test2 Handler loadItem with name: ${name}`);
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify({item: {name}}));
	res.end();
}

function saveItem(res, item) {
	console.info(`test2 Handler saveItem with item: ${item}`);
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify({item: {item}}));
	res.end();
}

function deleteItem(res, name) {
	console.log(`Handler deleteItem with name: ${name}`);
	res.writeHead(200);
	res.end();
}

export default handler;
