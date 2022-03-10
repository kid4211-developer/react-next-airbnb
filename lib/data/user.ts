import { connectToDatabase } from "@lib/mongodb";
import { StoredUserType } from "../../types/users";

const getUsers = async () => {
  const { db } = await connectToDatabase();
  const users = await db
    .collection("users")
    .find({})
    .sort({ published: -1 })
    .toArray();
  return users;
};

export const exist = async (email: string) => {
  const users = await getUsers();
  const result = users.some((user: StoredUserType) => user.email === email);
  return result;
};

export const checkUserId = async () => {
  const users = await getUsers();
  return users.length;
};
