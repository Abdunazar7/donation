import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Shop } from "./models/shop.model";
import { CreateShopDto } from "./dto/create-shop.dto";
import { UpdateShopDto } from "./dto/update-shop.dto";

@Injectable()
export class ShopService {
  constructor(@InjectModel(Shop) private shopModel: typeof Shop) {}

  async create(dto: CreateShopDto) {
    // optionally check duplicates by name+recipient
    // const exists = await this.shopModel.findOne({ where: { name: dto.name, recipientId: dto.recipientId }});
    // if (exists) throw new ConflictException(...);

    return this.shopModel.create(dto);
  }

  findAll() {
    return this.shopModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const shop = await this.shopModel.findByPk(id, { include: { all: true } });
    if (!shop) throw new NotFoundException(`Shop item with ID ${id} not found`);
    return shop;
  }

  async update(id: number, dto: UpdateShopDto) {
    const shop = await this.findOne(id);
    return shop.update(dto);
  }

  async remove(id: number) {
    const shop = await this.findOne(id);
    await shop.destroy();
    return { message: `Shop item ${id} deleted` };
  }
}
