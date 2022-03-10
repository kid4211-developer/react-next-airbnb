import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@lib/mongodb";

// const { ObjectId } = require("mongodb").ObjectId;

// Getting all posts.
async function getPosts(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("??");
    const { db } = await connectToDatabase();
    const users = await db
      .collection("users")
      .find({})
      .sort({ published: -1 })
      .toArray();
    console.log(users);
    return res.json({
      message: JSON.parse(JSON.stringify(users)),
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getPosts(req, res);
    }

    default:
      return {};
  }
};
