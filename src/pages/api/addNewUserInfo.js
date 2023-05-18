import { connectToDb, db } from "../../../db";

const addNewUser = async (req, res) => {
  if (req.method === "POST") {
    await connectToDb();
    try {
      const { user, data } = req.body;

      const { insertedId } = await db
        .collection("users")
        .insertOne({ user, data });

      res.status(200).json({ message: "Added successfully" });
    } catch (e) {
      console.log("Error is ", e);
      res.status(500).json({ message: "Error creating user" });
    }
  } else {
    res.status(400).json({ message: "Method not allowed" });
  }
};

export default addNewUser;
