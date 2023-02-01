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

export const putDb = async (content) => {
	console.log("Saving text jate to database");

	const contactDb = await openDB("jate", 1);
	const newTransaction = contactDb.transaction("jate", "readwrite");
	const objectStore = newTransaction.objectStore("jate");
	const request = objectStore.add({ text: content });
	const result = await request;
	console.log("text saved!", result);
};

export const getDb = async () => {
	console.log("Retrieving previous text jate content");
	const contactDb = await openDB("jate", 1);
	const newTransaction = contactDb.transaction("jate", "readonly");
	const objectStore = newTransaction.objectStore("jate");
	const request = objectStore.getAll();
	const result = await request;
	console.log("result.value", result);
	return result;
};

initdb();
