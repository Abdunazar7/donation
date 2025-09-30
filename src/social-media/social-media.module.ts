import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SocialMedia } from "./models/social-media.model";
import { SocialMediaService } from "./social-media.service";
import { SocialMediaController } from "./social-media.controller";

@Module({
  imports: [SequelizeModule.forFeature([SocialMedia])],
  controllers: [SocialMediaController],
  providers: [SocialMediaService],
})
export class SocialMediaModule {}
