import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Card } from "./models/card.model";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";

@Injectable()
export class CardService {
  constructor(@InjectModel(Card) private readonly cardModel: typeof Card) {}

  async create(createCardDto: CreateCardDto) {
    const candidate = await this.cardModel.findOne({
      where: { card_number: createCardDto.card_number },
    });
    if (candidate) {
      throw new ConflictException("Card with this number already exists");
    }
    return this.cardModel.create(createCardDto);
  }

  async findAll() {
    return this.cardModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const card = await this.cardModel.findByPk(id, { include: { all: true } });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    const card = await this.findOne(id);
    return card.update(updateCardDto);
  }

  async remove(id: number) {
    const card = await this.findOne(id);
    await card.destroy();
    return { message: `Card with ID ${id} deleted successfully` };
  }
}
