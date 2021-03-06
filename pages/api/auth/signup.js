import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method == "POST") {
    const data = req.body;
    const { email, password } = data;
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          "Invalid input - password should also be at least 7 characters long.",
      });
    }
    const client = await connectToDatabase();

    const existingUser = await client.db().collection('users').findOne({email: email});

    if (existingUser) {
      res.status(422).json({ message: "User exists already!" });
      client.close();
      return;
    }

    const db = client.db();

    const hashedPassword = await hashPassword(password);

    const result = await db
      .collection("users")
      .insertOne({ email: email, password: hashedPassword });

    res.status(201).json({ message: "Created user successfully!" });
    client.close();
  } else {
    return;
  }
}

export default handler;
