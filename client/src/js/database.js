import { openDB } from "idb";

const initdb = async () =>
	openDB("jate", 1, {
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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
	console.log("Saving text editor to database");

	const contactDb = await openDB("editor", 1);
	const newTransaction = contactDb.transaction("editor", "readwrite");
	const objectStore = newTransaction.objectStore("editor");
	const request = objectStore.add({ text: content });
	const result = await request;
	console.log("text saved!", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
	console.log("Retrieving previous text editor content");
	const contactDb = await openDB("editor", 1);
	const newTransaction = contactDb.transaction("editor", "readonly");
	const objectStore = newTransaction.objectStore("editor");
	const request = objectStore.getAll();
	const result = await request;
	console.log("result.value", result);
	return result;
};

initdb();
