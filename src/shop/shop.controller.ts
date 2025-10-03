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
import { ShopService } from "./shop.service";
import { CreateShopDto } from "./dto/create-shop.dto";
import { UpdateShopDto } from "./dto/update-shop.dto";
import { Shop } from "./models/shop.model";

@ApiTags("Shops")
@Controller("shops")
export class ShopController {
  constructor(private readonly service: ShopService) {}

  @Post()
  @ApiOperation({ summary: "Create shop item" })
  @ApiResponse({ status: 201, type: Shop })
  create(@Body() dto: CreateShopDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all shop items" })
  @ApiResponse({ status: 200, type: [Shop] })
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get shop item by id" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update shop item" })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateShopDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete shop item" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
