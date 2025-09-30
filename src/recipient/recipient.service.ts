import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcrypt";
import { Recipient } from "./models/recipient.model";
import { CreateRecipientDto } from "./dto/create-recipient.dto";
import { UpdateRecipientDto } from "./dto/update-recipient.dto";
import { RecipientSocial } from "../recipient-social/models/recipient-social.model";

@Injectable()
export class RecipientService {
  constructor(
    @InjectModel(Recipient)
    private readonly recipientModel: typeof Recipient,
    @InjectModel(RecipientSocial)
    private readonly recipientSocialModel: typeof RecipientSocial
  ) {}

  // ✅ Create
  async create(createRecipientDto: CreateRecipientDto) {
    const candidate = await this.recipientModel.findOne({
      where: { email: createRecipientDto.email },
    });
    if (candidate) {
      throw new ConflictException(
        `Recipient with email ${createRecipientDto.email} already exists`
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createRecipientDto.password, 7);

    // Create recipient
    const recipient = await this.recipientModel.create({
      ...createRecipientDto,
      password: hashedPassword,
    });

    return recipient;
  }

  // ✅ Find all
  async findAll() {
    return this.recipientModel.findAll({
      include: { all: true },
    });
  }

  // ✅ Find one
  async findOne(id: number) {
    const recipient = await this.recipientModel.findByPk(id, {
      include: { all: true },
    });
    if (!recipient) {
      throw new NotFoundException(`Recipient with ID ${id} not found`);
    }
    return recipient;
  }

  // ✅ Update
  async update(id: number, updateRecipientDto: UpdateRecipientDto) {
    const recipient = await this.findOne(id);

    if (updateRecipientDto.password) {
      updateRecipientDto.password = await bcrypt.hash(
        updateRecipientDto.password,
        7
      );
    }

    await recipient.update(updateRecipientDto);
    return recipient;
  }

  // ✅ Delete
  async remove(id: number) {
    const recipient = await this.findOne(id);
    await recipient.destroy();
    return { message: `Recipient with ID ${id} deleted successfully` };
  }
}
