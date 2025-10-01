import { BlobOptions } from "buffer";
import { IsEmail } from "class-validator";

export class CreateAdminDto {
  full_name: string;

  @IsEmail()
  
  email: string;
  password: string;
  is_active: boolean;
  is_creator: boolean;
  token: string;
}
