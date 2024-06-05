import { open, opendir, rm } from 'node:fs/promises';

class Files {
	#dir = '/var/data/';
	#ext = '.json';
	#reExt = new RegExp(`${this.#ext}$`);


	async getNames() {
		let names = [];
		for await (const file of await opendir(this.#dir)) {
			names.push(file.name.replace(this.#reExt, ''));
		}
		return names;
	}	

	async loadItem(name) {
		let fd;
		try {
			fd = await open(this.#dir + name + this.#ext, 'r');
			return await fd.readFile('utf8');
		} finally {
			await fd?.close();
		}
	}

	async saveItem(name, item) {
		let fd;
		try {
			fd = await open(this.#dir + name + this.#ext, 'w');
			fd.writeFile(item);
		} finally {
			await fd?.close();
		}
	}

	async deleteItem(name) {
		await rm(this.#dir + name + this.#ext);
	}
}

export default Files;
