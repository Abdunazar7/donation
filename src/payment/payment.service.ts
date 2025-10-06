import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Payment } from "./models/payment.model";
import { CreatePaymentDto, UpdatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment) private paymentModel: typeof Payment) {}

  create(dto: CreatePaymentDto) {
    return this.paymentModel.create(dto);
  }

  findAll() {
    return this.paymentModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const payment = await this.paymentModel.findByPk(id, {
      include: { all: true },
    });
    if (!payment) throw new NotFoundException("Payment not found");
    return payment;
  }

  async update(id: number, dto: UpdatePaymentDto) {
    const payment = await this.findOne(id);
    return payment.update(dto);
  }

  async remove(id: number) {
    const payment = await this.findOne(id);
    await payment.destroy();
    return { message: "Payment deleted successfully" };
  }
}
