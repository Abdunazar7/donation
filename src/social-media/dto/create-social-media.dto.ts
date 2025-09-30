import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSocialMediaDto {
  @ApiProperty({ example: "Instagram", description: "Ijtimoiy tarmoq nomi" })
  @IsString()
  @IsNotEmpty()
  social_media: string;

  @ApiProperty({
    example: "https://cdn.icon.com/insta.png",
    description: "Ikonka URL manzili",
  })
  @IsString()
  iconic_url: string;
}
