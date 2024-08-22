import { IsEmail, IsEmpty, Length } from "class-validator";

export class CreateUserInputs {
  @IsEmail()
  email: string;

  @Length(7, 12)
  phone: string;

  @Length(6, 12)
  password: string;

  firstname: string;

  lastname: string;

  address: string;
}

export class UserLoginInputs {
  @IsEmail()
  email: string;

  @Length(6, 12)
  password: string;
}

export interface UserPayload {
  _id: any;
  email: string;
  verified: boolean;
}

export class EditProfileInput {
  // @IsEmail()
  // email: string;

  // @Length(7, 12)
  // phone: string;

  // @Length(6, 12)
  // password: string;
  @Length(1, 50)
  firstname: string;

  @Length(1, 50)
  lastname: string;

  @Length(1, 50)
  address: string;
}
