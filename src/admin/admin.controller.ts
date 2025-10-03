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
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./models/admin.model";

@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Post()
  @ApiOperation({ summary: "Create admin" })
  @ApiResponse({ status: 201, type: Admin })
  create(@Body() dto: CreateAdminDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all admins" })
  @ApiResponse({ status: 200, type: [Admin] })
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get admin by id" })
  @ApiResponse({ status: 200, type: Admin })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update admin" })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateAdminDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete admin" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
