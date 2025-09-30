import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Card } from "./models/card.model";
import { CardService } from "./card.service";
import { CardController } from "./card.controller";

@Module({
  imports: [SequelizeModule.forFeature([Card])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
