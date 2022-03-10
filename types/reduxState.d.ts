import { UserType } from "./users";

/* userredux state */
export type UserState = UserType & { isLogged: boolean };

export type CommonState = {
  validateMode: boolean;
};
