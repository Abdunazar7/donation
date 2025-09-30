import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Put,
} from "@nestjs/common";
import { SocialMediaService } from "./social-media.service";
import { CreateSocialMediaDto } from "./dto/create-social-media.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SocialMedia } from "./models/social-media.model";

@ApiTags("Social Media")
@Controller("social-media")
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @Post()
  @ApiOperation({ summary: "Yangi ijtimoiy tarmoq qo‘shish" })
  @ApiResponse({ status: 201, type: SocialMedia })
  create(@Body() dto: CreateSocialMediaDto) {
    return this.socialMediaService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha ijtimoiy tarmoqlarni olish" })
  @ApiResponse({ status: 200, type: [SocialMedia] })
  findAll() {
    return this.socialMediaService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali ijtimoiy tarmoqni olish" })
  findOne(@Param("id") id: number) {
    return this.socialMediaService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Ijtimoiy tarmoqni yangilash" })
  update(@Param("id") id: number, @Body() dto: CreateSocialMediaDto) {
    return this.socialMediaService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Ijtimoiy tarmoqni o‘chirish" })
  remove(@Param("id") id: number) {
    return this.socialMediaService.remove(id);
  }
}
