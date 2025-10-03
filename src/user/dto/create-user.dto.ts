import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "Ali Valiyev" })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: "ali@mail.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "password123" })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "8600 1234 5678 9012" })
  @IsString()
  @IsNotEmpty()
  card_number: string;

  @ApiProperty({ example: "randomToken123" })
  @IsString()
  token: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_active: boolean;
}
