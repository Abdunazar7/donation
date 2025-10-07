import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly mailService: MailService
  ) {}

  async activateUser(link: string): Promise<any> {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }

    const [_, updatedUsers] = await this.userModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true,
      }
    );

    const updatedUser = updatedUsers[0];

    if (!updatedUser) {
      throw new BadRequestException("User already activated");
    }

    return {
      message: "User activated successfully",
      is_active: updatedUser.is_active,
    };
  }

  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;
    if (password !== confirm_password) {
      throw new BadRequestException({ message: "Parols do not match." });
    }
    const hashedPassword = await bcrypt.hash(password, 7);
    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      await this.mailService.sendMail(user);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Error while sendong an email");
    }
    return user;
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
