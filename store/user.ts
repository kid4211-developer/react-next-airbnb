import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types/users";
import { UserState } from "../types/reduxState";

const initialState: UserState = {
  id: 0,
  email: "",
  lastName: "",
  firstName: "",
  birthday: "",
  isLogged: false,
  profileImage: "",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    /* 로그인한 유저 정보로 변경하기 */
    setLoggedUser(state, action: PayloadAction<UserType>) {
      state = { ...action.payload, isLogged: true };
      return state;
    },
  },
});

export const userActions = { ...user.actions };

export default user;
