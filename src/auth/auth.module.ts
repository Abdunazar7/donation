import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtModule } from "@nestjs/jwt";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

import { Admin } from "../admin/models/admin.model";
import { User } from "../user/models/user.model";
import { Recipient } from "../recipient/models/recipient.model";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Admin, User, Recipient]),
    JwtModule.register({
      secret: process.env.SECRET_KEY || "defaultSecret",
      signOptions: {
        expiresIn: process.env.SECRET_TIME || "15h",
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
