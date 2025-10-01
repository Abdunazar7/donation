import { Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private readonly userModel: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto) {
    const existingAdmin = await this.userModel.findOne({
      where: { email: createAdminDto.email },
    });
    if (existingAdmin) {
      throw new Error("Admin with this email already exists");
    }
    return this.userModel.create(createAdminDto);
  }

  findAll() {
    return this.userModel.findAll();
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.userModel.findByPk(id);
    if (!admin) {
      throw new Error("Admin not found");
    }
    await admin.update(updateAdminDto);
    return admin;
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }
}
