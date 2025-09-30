import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { SocialMedia } from "./models/social-media.model";
import { CreateSocialMediaDto } from "./dto/create-social-media.dto";
import { UpdateSocialMediaDto } from "./dto/update-social-media.dto";

@Injectable()
export class SocialMediaService {
  constructor(
    @InjectModel(SocialMedia) private readonly socialModel: typeof SocialMedia
  ) {}

  async create(createSocialMediaDto: CreateSocialMediaDto) {
    const candidate = await this.socialModel.findOne({
      where: { social_media: createSocialMediaDto.social_media },
    });
    if (candidate) {
      throw new ConflictException("This social media already exists");
    }
    return this.socialModel.create(createSocialMediaDto);
  }

  async findAll() {
    return this.socialModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const social = await this.socialModel.findByPk(id, {
      include: { all: true },
    });
    if (!social) {
      throw new NotFoundException(`SocialMedia with ID ${id} not found`);
    }
    return social;
  }

  async update(id: number, updateSocialMediaDto: UpdateSocialMediaDto) {
    const social = await this.findOne(id);
    return social.update(updateSocialMediaDto);
  }

  async remove(id: number) {
    const social = await this.findOne(id);
    await social.destroy();
    return { message: `SocialMedia with ID ${id} deleted successfully` };
  }
}
