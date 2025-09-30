import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RecipientSocial } from "./models/recipient-social.model";
import { CreateRecipientSocialDto } from "./dto/create-recipient-social.dto";
import { UpdateRecipientSocialDto } from "./dto/update-recipient-social.dto";

@Injectable()
export class RecipientSocialService {
  constructor(
    @InjectModel(RecipientSocial)
    private readonly recipientSocialModel: typeof RecipientSocial
  ) {}

  async create(createRecipientSocialDto: CreateRecipientSocialDto) {
    return this.recipientSocialModel.create(createRecipientSocialDto);
  }

  async findAll() {
    return this.recipientSocialModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const recSocial = await this.recipientSocialModel.findByPk(id, {
      include: { all: true },
    });
    if (!recSocial) {
      throw new NotFoundException(`RecipientSocial with ID ${id} not found`);
    }
    return recSocial;
  }

  async update(id: number, updateRecipientSocialDto: UpdateRecipientSocialDto) {
    const recSocial = await this.findOne(id);
    return recSocial.update(updateRecipientSocialDto);
  }

  async remove(id: number) {
    const recSocial = await this.findOne(id);
    await recSocial.destroy();
    return { message: `RecipientSocial with ID ${id} deleted successfully` };
  }
}
