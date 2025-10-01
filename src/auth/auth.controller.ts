import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body, } from '@nestjs/common';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SignInAdminDto } from '../admin/dto/signin-admin.dto';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signUp(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.signUp(createAdminDto);
  }

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInAdminDto: SignInAdminDto) {
    return this.authService.signIn(signInAdminDto);
  }
}
