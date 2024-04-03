const handler = {
	'GET /': getNames,
	'PUT /item': getItem,
};

function getNames(res) {
	console.info('Handler getNames');
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify({names: []}));
	res.end();
}

function getItem(res, name) {
	console.info(`Handler getItem with name: ${name}`);
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify({item: {name}}));
	res.end();
}

export default handler;
