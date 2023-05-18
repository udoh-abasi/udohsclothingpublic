import { connectToDb, db } from "../../../../db";

const getUserInfo = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { email } = req.query;
      await connectToDb();

      const { user, data } = await db
        .collection("users")
        .findOne({ user: email });

      res.status(200).json({ userInfo: { user, data } });
    } catch (e) {
      console.log("Error is getting user, ", e);
      res.status(500).json({ message: "Error getting user" });
    }
  } else {
    res.status(400).json({ message: "Method not allowed" });
  }
};

export default getUserInfo;
