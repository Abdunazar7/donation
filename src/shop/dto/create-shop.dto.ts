import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateShopDto {
  @ApiProperty({ example: "Medicine pack" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  count: number;

  @ApiProperty({ example: 49.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: "Pain relief tablets" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  recipientId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  categoryId: number;

  @ApiProperty({ example: "Detailed description" })
  @IsString()
  @IsNotEmpty()
  description: string;
}
