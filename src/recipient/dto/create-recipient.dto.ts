import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRecipientDto {
  @ApiProperty({
    example: "Ali Valiyev",
    description: "Recipientning to'liq ismi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Ali Valiyev",
    description: "Recipientning to'liq ismi",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: "ali@mail.com",
    description: "Recipient email manzili",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "1334 2564 7890 1234 5678",
    description: "Recipient card number",
  })
  @IsString()
  card_number: string;

  @ApiProperty({ example: "12345678", description: "Recipient paroli" })
  @IsString()
  password: string;

  @ApiProperty({
    example: "Toshkent sh, Chilonzor",
    description: "Recipient manzili",
    required: false,
  })
  @IsOptional()
  addres: string;
}
