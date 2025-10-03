import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  async create(dto: CreateAdminDto) {
    const exist = await this.adminModel.findOne({
      where: { email: dto.email },
    });
    if (exist)
      throw new ConflictException("Admin with this email already exists");

    const hashedPassword = await bcrypt.hash(dto.password, 7);
    return this.adminModel.create({ ...dto, password: hashedPassword });
  }

  findAll() {
    return this.adminModel.findAll();
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) throw new NotFoundException(`Admin with ID ${id} not found`);
    return admin;
  }

  async update(id: number, dto: UpdateAdminDto) {
    const admin = await this.findOne(id);
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 7);
    }
    return admin.update(dto);
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    await admin.destroy();
    return { message: `Admin ${id} deleted` };
  }

  async findByEmail(email: string) {
    return this.adminModel.findOne({ where: { email } });
  }
}
