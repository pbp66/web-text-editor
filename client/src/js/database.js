import { openDB } from "idb";
import { header } from "./header.js";

const initdb = async () =>
	await openDB("jate", 1, {
		upgrade(db) {
			if (db.objectStoreNames.contains("jate")) {
				console.log("jate database already exists");
				return;
			}
			db.createObjectStore("jate", {
				keyPath: "id",
				autoIncrement: true,
			});
			console.log("jate database created");
		},
	});

export const putDb = async (content) => {
	console.log("Saving text editor content!");

	const textEditorDb = await openDB("jate", 1);
	const newTransaction = textEditorDb.transaction("jate", "readwrite");
	const objectStore = newTransaction.objectStore("jate");
	const request = objectStore.put({ id: 1, content: content });
	const result = await request;
	console.log("Text saved!", result);
};

export const getDb = async () => {
	console.log("Retrieving previous text editor content");
	const textEditorDb = await openDB("jate", 1);
	const newTransaction = textEditorDb.transaction("jate", "readonly");
	const objectStore = newTransaction.objectStore("jate");
	const request = objectStore.getAll();
	const result = await request;
	console.log("result.value", result);
	return result[0].content;
};

initdb();
