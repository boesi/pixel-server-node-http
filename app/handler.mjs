import { open, opendir, rm } from 'node:fs/promises';
import config from './config.mjs';

const rootPath = config.serverPath + '/';
const itemPath = config.serverPath + '/item';
const dir = '/var/data/';

const ext = '.json';
const reExt = new RegExp(`${ext}$`);

const handler = {
	['GET ' + rootPath]: getNames,
	['GET ' + itemPath]: loadItem,
	['PUT ' + itemPath]: saveItem,
	['DELETE ' + itemPath]: deleteItem,
};

async function getNames(res) {
	console.info('Handler getNames');
	try {
		let names = [];
		for await (const file of await opendir(dir)) {
			names.push(file.name.replace(reExt, ''));
		}
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
	let fd;
	try {
		fd = await open(dir + parameter.get('name') + ext, 'r');
		let item = await fd.readFile('utf8');
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(item);
	} catch(error) {
		console.error('Handler loadItem', {parameter, error});
		res.writeHead(400);
		res.write(error.message);
	} finally {
		await fd?.close();
	}
	res.end();
}

async function saveItem(res, parameter, item) {
	console.info(`Handler saveItem with item type: ${typeof item}, parameter: ${parameter}`);
	let fd;
	try {
		fd = await open(dir + parameter.get('name') + ext, 'w');
		fd.writeFile(item);
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(JSON.stringify({item: {item}}));
	} catch(error) {
		console.error('Handler deleteItem', {parameter, error});
		res.writeHead(500);
		res.write(error.message);
	} finally {
		await fd?.close();
	}
	res.end();
}

async function deleteItem(res, parameter) {
	console.log(`Handler deleteItem with name: ${parameter}`);
	let fd;
	try {
		await rm(dir + parameter.get('name') + ext);
		res.writeHead(200);
	} catch(error) {
		console.error('Handler deleteItem', {parameter, error});
		res.writeHead(400);
		res.write(error.message);
	} finally {
		await fd?.close();
	}
	res.end();
}

export default handler;
