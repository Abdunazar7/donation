import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Recipient } from "./models/recipient.model";
import { RecipientService } from "./recipient.service";
import { RecipientController } from "./recipient.controller";
import { RecipientSocial } from "../recipient-social/models/recipient-social.model";

@Module({
  imports: [SequelizeModule.forFeature([Recipient, RecipientSocial])],
  controllers: [RecipientController],
  providers: [RecipientService],
})
export class RecipientModule {}
