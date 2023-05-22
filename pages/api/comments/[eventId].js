const handler = (req, res) => {
	const { method } = req;
	const { eventId } = req.query;
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
			id: new Date().toISOString(),
			email,
			name,
			text,
		};
		console.log(new_comment);
		return res.status(201).json(new_comment);
	} else if (method === "GET") {
		const dummyList = [
			{
				id: "c1",
				name: "Prajwal",
				email: "prajwal@test.com",
				text: "A Dummy comments",
			},
			{
				id: "c2",
				name: "Prajwal_1",
				email: "prajwal_!@test.com",
				text: "A Dummy comments part-2",
			},
		];

		return res.status(200).json({ comments: dummyList });
	}
};
export default handler;
