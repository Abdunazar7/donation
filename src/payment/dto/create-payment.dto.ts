import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
} from "class-validator";
import { PaymentMethod, PaymentStatus } from "../models/payment.model";

export class CreatePaymentDto {
  @ApiProperty()
  @IsInt()
  user_id: number;

  @ApiProperty()
  @IsInt()
  donate_id: number;

  @ApiProperty()
  @IsInt()
  order_id: number;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @ApiProperty({ enum: PaymentStatus })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({ example: "2025-10-06" })
  @IsDateString()
  payment_date: Date;
}

export class UpdatePaymentDto extends CreatePaymentDto {}
