import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateRecipientSocialDto {
  @ApiProperty({ example: 1, description: "SocialMedia ID" })
  @IsInt()
  socialId: number;

  @ApiProperty({ example: 2, description: "Recipient ID" })
  @IsInt()
  recipientId: number;

  @ApiProperty({
    example: "https://instagram.com/ali",
    description: "Recipientning ijtimoiy tarmoq linki",
  })
  @IsString()
  @IsNotEmpty()
  social_url: string;
}
