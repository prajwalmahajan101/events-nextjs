const handler = async (req, res) => {
	const { method } = req;
	if (method === "POST") {
		const { email } = req.body;
		if (!email || !email.includes("@")) {
			return res.status(422).json({
				message: "Invalid Email address",
			});
		}

		console.log(email);
		return res.status(201).json({ email });
	}
};
export default handler;
