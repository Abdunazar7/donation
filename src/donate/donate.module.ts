import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Donate } from "./models/donate.model";
import { DonateService } from "./donate.service";
import { DonateController } from "./donate.controller";

@Module({
  imports: [SequelizeModule.forFeature([Donate])],
  controllers: [DonateController],
  providers: [DonateService],
})
export class DonateModule {}
