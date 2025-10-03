import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./models/order.model";

@ApiTags("Orders")
@Controller("orders")
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post()
  @ApiOperation({ summary: "Create order" })
  @ApiResponse({ status: 201, type: Order })
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all orders" })
  @ApiResponse({ status: 200, type: [Order] })
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateOrderDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
