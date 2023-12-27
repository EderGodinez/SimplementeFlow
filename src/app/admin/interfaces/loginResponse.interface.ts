import { User } from "src/app/interfaces/user.interfaces";

export interface LoginResponse{
  User:User;
  token:string;
}
