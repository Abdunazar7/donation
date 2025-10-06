import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Donate } from "./models/donate.model";
import { CreateDonateDto, UpdateDonateDto } from "./dto/create-donate.dto";

@Injectable()
export class DonateService {
  constructor(@InjectModel(Donate) private donateModel: typeof Donate) {}

  async create(dto: CreateDonateDto) {
    return this.donateModel.create(dto);
  }

  findAll() {
    return this.donateModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const donate = await this.donateModel.findByPk(id, {
      include: { all: true },
    });
    if (!donate) throw new NotFoundException("Donation not found");
    return donate;
  }

  async update(id: number, dto: UpdateDonateDto) {
    const donate = await this.findOne(id);
    return donate.update(dto);
  }

  async remove(id: number) {
    const donate = await this.findOne(id);
    await donate.destroy();
    return { message: "Donation deleted successfully" };
  }
}
