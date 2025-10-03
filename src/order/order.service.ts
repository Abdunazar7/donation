import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Order, OrderStatus } from "./models/order.model";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Shop } from "../shop/models/shop.model";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(Shop) private shopModel: typeof Shop
  ) {}

  // create and compute total based on shop price * quantity
  async create(dto: CreateOrderDto) {
    const shop = await this.shopModel.findByPk(dto.shopId);
    if (!shop) throw new NotFoundException("Shop item not found");

    // compute total = price * quantity
    const price = Number(shop.price);
    if (isNaN(price)) throw new BadRequestException("Shop price invalid");

    const total = +(price * dto.quantity).toFixed(2);

    const order = await this.orderModel.create({
      ...dto,
      total,
    });
    return order;
  }

  findAll() {
    return this.orderModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const order = await this.orderModel.findByPk(id, {
      include: { all: true },
    });
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);
    return order;
  }

  async update(id: number, dto: UpdateOrderDto) {
    const order = await this.findOne(id);

    // if shopId or quantity changed, recalc total
    if ((dto as any).shopId || (dto as any).quantity) {
      const shopId = dto.shopId ?? order.shopId;
      const quantity = dto.quantity ?? order.quantity;
      const shop = await this.shopModel.findByPk(shopId);
      if (!shop)
        throw new NotFoundException("Shop item not found for recalculation");
      order.total = +(Number(shop.price) * quantity).toFixed(2);
    }

    return order.update(dto);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    await order.destroy();
    return { message: `Order ${id} deleted` };
  }
}
