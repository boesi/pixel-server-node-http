import config from './config.mjs';
import Files from './files.mjs';

const rootPath = config.serverPath + '/';
const itemPath = config.serverPath + '/item';

const files = new Files();

const handler = {
	['GET ' + rootPath]: getNames,
	['GET ' + itemPath]: loadItem,
	['PUT ' + itemPath]: saveItem,
	['DELETE ' + itemPath]: deleteItem,
};

async function getNames(res) {
	console.info('Handler getNames');
	try {
		let names = await files.getNames();
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(JSON.stringify({names}));
	} catch (error) {
		console.error('Handler getNames: error reading content of directory', {error});
		res.writeHead(500);
		res.write(error.message);
	}
	res.end();
}

async function loadItem(res, parameter) {
	console.info(`Handler loadItem with parameter: ${parameter}`);
	try {
		const item = await files.loadItem(parameter.get('name'));
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(item);
	} catch(error) {
		console.error('Handler loadItem', {parameter, error});
		res.writeHead(400);
		res.write(error.message);
	}
	res.end();
}

async function saveItem(res, parameter, item) {
	console.info(`Handler saveItem with item type: ${typeof item}, parameter: ${parameter}`);
	try {
		await files.saveItem(parameter.get('name'), item);
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(JSON.stringify({item: {item}}));
	} catch(error) {
		console.error('Handler saveItem', {parameter, error});
		res.writeHead(500);
		res.write(error.message);
	}
	res.end();
}

async function deleteItem(res, parameter) {
	console.log(`Handler deleteItem with name: ${parameter}`);
	try {
		await files.deleteItem(parameter.get('name'));
		res.writeHead(200);
	} catch(error) {
		console.error('Handler deleteItem', {parameter, error});
		res.writeHead(400);
		res.write(error.message);
	}
	res.end();
}

export default handler;
