import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";

@Module({
  imports: [SequelizeModule.forFeature([Admin])],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
