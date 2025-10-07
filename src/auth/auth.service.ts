import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "../admin/models/admin.model";
import { User } from "../user/models/user.model";
import { Recipient } from "../recipient/models/recipient.model";

import { CreateUserDto } from "../user/dto/create-user.dto";
import { CreateRecipientDto } from "../recipient/dto/create-recipient.dto";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "../user/user.service";
import { Response, Request } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @InjectModel(Admin) private readonly adminModel: typeof Admin,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Recipient) private readonly recipientModel: typeof Recipient
  ) {}

  private async generateTokens(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async register(createUserDto: CreateUserDto) {
    const candidate = await this.userService.findByEmail(createUserDto.email);
    if (candidate) {
      throw new ConflictException("User with this email already exists.");
    }

    const newUser = await this.userService.create(createUserDto);
    return newUser;
  }

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

  async signin(dto: LoginDto) {
    let user: any = await this.adminModel.findOne({
      where: { email: dto.email },
    });
    if (user && (await bcrypt.compare(dto.password, user.password))) {
      return this.generateToken(user.id, user.email, "admin");
    }

    user = await this.userModel.findOne({ where: { email: dto.email } });
    if (user && (await bcrypt.compare(dto.password, user.password))) {
      return this.generateToken(user.id, user.email, "user");
    }

    user = await this.recipientModel.findOne({ where: { email: dto.email } });
    if (user && (await bcrypt.compare(dto.password, user.password))) {
      return this.generateToken(user.id, user.email, "recipient");
    }

    throw new UnauthorizedException("Email or password is incorrect");
  }

  private async generateToken(id: number, email: string, role: string) {
    const payload = { sub: id, email, role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async logout(refreshToken: string, res: Response) {
    const userData = this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!userData) {
      throw new UnauthorizedException("User not verified");
    }

    const user = await this.userService.findOne(userData.id);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    user.refresh_token = "";
    await user.save();

    res.clearCookie("refreshToken");

    return { message: "User logged out successfully" };
  }

  async refreshToken(userId: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);
    if (userId !== decodedToken["id"]) {
      throw new ForbiddenException("Unauthorized id");
    }

    const user = await this.userService.findOne(userId);
    if (!user || !user.refresh_token) {
      throw new ForbiddenException("Unauthorized user");
    }

    const tokenMatch = await bcrypt.compare(refresh_token, user.refresh_token);
    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);
    user.refresh_token = await bcrypt.hash(refreshToken, 7);
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {
      message: "User refreshed",
      userId: user.id,
      access_token: accessToken,
    };
  }
}
