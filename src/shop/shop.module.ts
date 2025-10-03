import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Shop } from "./models/shop.model";
import { ShopService } from "./shop.service";
import { ShopController } from "./shop.controller";
import { Recipient } from "../recipient/models/recipient.model";
import { Category } from "../category/models/category.model";

@Module({
  imports: [SequelizeModule.forFeature([Shop, Recipient, Category])],
  providers: [ShopService],
  controllers: [ShopController],
  exports: [ShopService],
})
export class ShopModule {}
