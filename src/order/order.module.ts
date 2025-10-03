import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Order } from "./models/order.model";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { Shop } from "../shop/models/shop.model";
import { User } from "../user/models/user.model";

@Module({
  imports: [SequelizeModule.forFeature([Order, Shop, User])],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
