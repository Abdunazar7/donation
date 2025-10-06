import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateDonateDto {
  @ApiProperty({ example: 3 })
  @IsInt()
  recipient_id: number;

  @ApiProperty({ example: 5 })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: "For good cause" })
  @IsString()
  @IsNotEmpty()
  notification: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_AnonimPay: boolean;
}

export class UpdateDonateDto extends CreateDonateDto {}
