import { MongoClient } from "mongodb";
export const connectDatabase = async () => {
	const client = await MongoClient.connect(process.env.DB_URL);
	const db = client.db();
	return { client, db };
};

export const insertDocument = async (db, collection, document) => {
	return await db.collection(collection).insertOne(document);
};
