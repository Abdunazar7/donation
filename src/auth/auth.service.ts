import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "../admin/models/admin.model";
import { User } from "../user/models/user.model";
import { Recipient } from "../recipient/models/recipient.model";

import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { CreateRecipientDto } from "../recipient/dto/create-recipient.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Admin) private readonly adminModel: typeof Admin,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Recipient) private readonly recipientModel: typeof Recipient
  ) {}

  // ------------------- ADMIN SIGNUP -------------------
  async signupAdmin(dto: CreateAdminDto) {
    const exists = await this.adminModel.findOne({
      where: { email: dto.email },
    });
    if (exists) {
      throw new ConflictException("Admin already exists");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const admin = await this.adminModel.create({
      ...dto,
      password: hashedPassword,
    });

    return this.generateToken(admin.id, admin.email, "admin");
  }

  // ------------------- USER SIGNUP -------------------
  async signupUser(dto: CreateUserDto) {
    const exists = await this.userModel.findOne({
      where: { email: dto.email },
    });
    if (exists) {
      throw new ConflictException("User already exists");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userModel.create({
      ...dto,
      password: hashedPassword,
    });

    return this.generateToken(user.id, user.email, "user");
  }

  // ------------------- RECIPIENT SIGNUP -------------------
  async signupRecipient(dto: CreateRecipientDto) {
    const exists = await this.recipientModel.findOne({
      where: { email: dto.email },
    });
    if (exists) {
      throw new ConflictException("Recipient already exists");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const recipient = await this.recipientModel.create({
      ...dto,
      password: hashedPassword,
    });

    return this.generateToken(recipient.id, recipient.email, "recipient");
  }

  // ------------------- SIGNIN -------------------
  async signin(dto: LoginDto) {
    // 1️⃣ Admin qidirish
    let user: any = await this.adminModel.findOne({ where: { email: dto.email } });
    if (user && (await bcrypt.compare(dto.password, user.password))) {
      return this.generateToken(user.id, user.email, "admin");
    }

    // 2️⃣ Oddiy user qidirish
    user = await this.userModel.findOne({ where: { email: dto.email } });
    if (user && (await bcrypt.compare(dto.password, user.password))) {
      return this.generateToken(user.id, user.email, "user");
    }

    // 3️⃣ Recipient qidirish
    user = await this.recipientModel.findOne({ where: { email: dto.email } });
    if (user && (await bcrypt.compare(dto.password, user.password))) {
      return this.generateToken(user.id, user.email, "recipient");
    }

    throw new UnauthorizedException("Email or password is incorrect");
  }

  // ------------------- TOKEN GENERATOR -------------------
  private async generateToken(id: number, email: string, role: string) {
    const payload = { sub: id, email, role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
