import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(dto: CreateUserDto) {
    const exist = await this.userModel.findOne({ where: { email: dto.email } });
    if (exist)
      throw new ConflictException("User with this email already exists");

    const hashedPassword = await bcrypt.hash(dto.password, 7);
    return this.userModel.create({ ...dto, password: hashedPassword });
  }

  findAll() {
    return this.userModel.findAll();
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 7);
    }
    return user.update(dto);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await user.destroy();
    return { message: `User ${id} deleted` };
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }
}
