import { checkUserId, exist } from "@lib/data/user";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@lib/mongodb";
import jwt from "jsonwebtoken";
import { StoredUserType } from "../../../types/users";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const param = req.body;
  const { email, lastName, firstName, password, birthday } = param;
  const propfileImage = "/static/image/user/default_user_profile_image.jpg";
  const hashedPassword = bcrypt.hashSync(password, 8);

  const { db } = await connectToDatabase();
  const userId = (await checkUserId()) + 1;
  const newUser = {
    email,
    firstName,
    lastName,
    birthday,
    id: userId,
    profileImage: propfileImage,
    password: hashedPassword,
  };
  try {
    await db.collection("users").insertOne(newUser);

    const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET);
    res.setHeader(
      "Set-Cookie",
      `access_token=${token}; path=/; expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3
      )}; httponly`
    );

    const newUserWithoutPassword: Partial<Pick<StoredUserType, "password">> =
      newUser;
    delete newUserWithoutPassword.password;

    res.statusCode = 200;
    return res.send(newUser);
  } catch (err) {
    res.statusCode = 400;
    return res.send({ success: false });
  }
};

// await db.collection("users").insertOne(userSigninInfo);

//   const result = await exist(email);
//   if (result) {
//     res.statusCode = 400;
//     const str = "이미 존재하는 이메일주소입니다";
//     return res.send(JSON.stringify(str));
//   }
