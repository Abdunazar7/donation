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
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./models/category.model";

@ApiTags("Categories")
@Controller("categories")
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Post()
  @ApiOperation({ summary: "Create category" })
  @ApiResponse({ status: 201, type: Category })
  create(@Body() dto: CreateCategoryDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all categories" })
  @ApiResponse({ status: 200, type: [Category] })
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get category by id" })
  @ApiResponse({ status: 200, type: Category })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update category" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto
  ) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete category" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
