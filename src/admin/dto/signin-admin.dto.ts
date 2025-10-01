import { IsEmail } from "class-validator";

export class SignInAdminDto {
  @IsEmail()
  email: string;
  password: string;
}
