import axios from "@lib/api/index";
import { UserType } from "../../types/users";

interface SignupApiBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthday: string;
}

/* 회원가입 */
export const signupApi = (body: SignupApiBody) =>
  axios.post<UserType>("/api/auth/signup", body);
