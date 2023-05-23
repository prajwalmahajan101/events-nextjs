import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const { method } = req;
  if (method === "POST") {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(422).json({
        message: "Invalid Email address",
      });
    }
    try {
      const client = await MongoClient.connect(process.env.DB_URL);
      const db = client.db();
      await db.collection("emails").insertOne({ email });
	  client.close();
    } catch (err) {
      console.log(err);
    }
    return res.status(201).json({ email });
  }
};
export default handler;
