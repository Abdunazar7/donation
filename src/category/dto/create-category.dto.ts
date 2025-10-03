import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({ example: "Health" })
  @IsString()
  @IsNotEmpty()
  name: string;
}
