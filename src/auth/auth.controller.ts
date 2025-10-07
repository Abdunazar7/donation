import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";

import { CreateUserDto } from "../user/dto/create-user.dto";
import { CreateRecipientDto } from "../recipient/dto/create-recipient.dto";
import { LoginDto } from "./dto/login.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup/user")
  @ApiOperation({ summary: "User signup" })
  @ApiResponse({ status: 201, description: "User created successfully" })
  signupUser(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post("signup/recipient")
  @ApiOperation({ summary: "Recipient signup" })
  @ApiResponse({ status: 201, description: "Recipient created successfully" })
  signupRecipient(@Body() dto: CreateRecipientDto) {
    return this.authService.signupRecipient(dto);
  }

  @Post("signin")
  @ApiOperation({ summary: "Login for any user type (admin, user, recipient)" })
  @ApiResponse({
    status: 200,
    description: "Successfully signed in, returns JWT token",
  })
  signin(@Body() dto: LoginDto) {
    return this.authService.signin(dto);
  }
}
