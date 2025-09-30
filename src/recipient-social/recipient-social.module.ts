import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RecipientSocial } from "./models/recipient-social.model";
import { RecipientSocialService } from "./recipient-social.service";
import { RecipientSocialController } from "./recipient-social.controller";

@Module({
  imports: [SequelizeModule.forFeature([RecipientSocial])],
  controllers: [RecipientSocialController],
  providers: [RecipientSocialService],
})
export class RecipientSocialModule {}
