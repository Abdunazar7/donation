import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
  @ApiProperty({ example: "example@mail.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "strongPassword123" })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
