import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto, UpdatePaymentDto } from "./dto/create-payment.dto";
import { Payment } from "./models/payment.model";

@ApiTags("Payments")
@Controller("payments")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: "Create a new payment" })
  @ApiResponse({ status: 201, type: Payment })
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all payments" })
  @ApiResponse({ status: 200, type: [Payment] })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get payment by ID" })
  @ApiResponse({ status: 200, type: Payment })
  findOne(@Param("id") id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update payment" })
  update(@Param("id") id: string, @Body() dto: UpdatePaymentDto) {
    return this.paymentService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete payment" })
  remove(@Param("id") id: string) {
    return this.paymentService.remove(+id);
  }
}
