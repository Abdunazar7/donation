import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from "class-validator";
import { OrderStatus } from "../models/order.model";

export class CreateOrderDto {
  @ApiProperty({ example: "Tashkent, Mirabad 12" })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  shopId: number;

  @ApiProperty({ enum: OrderStatus, example: OrderStatus.IN_PROGRESS })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  quantity: number;
}
