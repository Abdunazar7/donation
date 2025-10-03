import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCardDto {
  @ApiProperty({
    example: "humo",
    enum: ["humo", "visa", "uzcard"],
    description: "Karta turi",
  })
  @IsEnum(["humo", "visa", "uzcard"]) // ✅ validate only allowed values
  @IsNotEmpty()
  card_type: string;

  @ApiProperty({ example: "8600123412341234", description: "Karta raqami" })
  @IsString()
  @Length(16, 16)
  card_number: string;

  @ApiProperty({ example: 1, description: "Recipient ID" })
  @IsInt()
  recipientId: number;

  @ApiProperty({ example: "12/26", description: "Amal qilish muddati" })
  @IsString()
  @IsNotEmpty()
  expiry_date: string;
}
