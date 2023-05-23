import { connectDatabase, insertDocument } from "@/helper/db-utils";

const handler = async (req, res) => {
	const { method } = req;
	if (method === "POST") {
		const { email } = req.body;
		if (!email || !email.includes("@")) {
			return res.status(422).json({
				message: "Invalid Email address",
			});
		}
		let db, client;
		try {
			let dataBaseConnection = await connectDatabase();
			db = dataBaseConnection.db;
			client = dataBaseConnection.client;
		} catch (err) {
			return res
				.status(500)
				.json({ message: "Error in Connecting the database" });
		}
		try {
			await insertDocument(db, "emails", { email });
		} catch (err) {
			return res
				.status(500)
				.json({ message: "Error in Inserting in the database" });
		}
		client.close();
		return res.status(201).json({ email, message: "Signed Up!" });
	}
};
export default handler;
