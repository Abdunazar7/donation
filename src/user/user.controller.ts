import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./models/user.model";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 201, type: User })
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [User] })
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get user by id" })
  @ApiResponse({ status: 200, type: User })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update user" })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete user" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
