export interface RegisterDto {
  email:string;
  names:string;
  lastnames:string;
  birthdate:Date;
  gender:string;
  phone:number;
  password:string;
  UserRole?:string;
}
