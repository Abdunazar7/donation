import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [SequelizeModule.forFeature([User]), MailModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
