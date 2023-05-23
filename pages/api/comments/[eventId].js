import { MongoClient } from "mongodb";

const handler = async (req, res) => {
	const { method } = req;
	const { eventId } = req.query;
	try {
		const client = await MongoClient.connect(process.env.DB_URL);
		const commentCollection = client.db().collection("comments");
		if (method === "POST") {
			const { email, name, text } = req.body;
			if (
				!email ||
				!email.includes("@") ||
				!name ||
				name.trim() === "" ||
				!text ||
				text.trim() === ""
			) {
				return res.status(422).json({
					message: "One or more inputs are invalid",
				});
			}
			const new_comment = {
				email,
				name,
				text,
				eventId,
			};
			let result = await commentCollection.insertOne(new_comment);
			client.close();
			return res.status(201).json(new_comment);
		} else if (method === "GET") {
			const comments = await commentCollection
				.find({ eventId })
				.sort({ _id: -1 })
				.toArray();
			client.close();
			return res.status(200).json({ comments });
		}
	} catch (err) {
		console.log(err);
	}
};
export default handler;
