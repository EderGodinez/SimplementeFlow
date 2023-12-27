import { User } from "src/app/interfaces/user.interfaces";

export interface CheckTokenResponse {
  User:  User;
  token: string;
}
