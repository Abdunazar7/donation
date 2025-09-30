import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Put,
} from "@nestjs/common";
import { RecipientSocialService } from "./recipient-social.service";
import { CreateRecipientSocialDto } from "./dto/create-recipient-social.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { RecipientSocial } from "./models/recipient-social.model";

@ApiTags("Recipient Socials")
@Controller("recipient-socials")
export class RecipientSocialController {
  constructor(
    private readonly recipientSocialService: RecipientSocialService
  ) {}

  @Post()
  @ApiOperation({ summary: "Recipientga ijtimoiy tarmoq linkini qo‘shish" })
  @ApiResponse({ status: 201, type: RecipientSocial })
  create(@Body() dto: CreateRecipientSocialDto) {
    return this.recipientSocialService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha recipient social linklarini olish" })
  findAll() {
    return this.recipientSocialService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali recipient socialni olish" })
  findOne(@Param("id") id: number) {
    return this.recipientSocialService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Recipient social linkini yangilash" })
  update(@Param("id") id: number, @Body() dto: CreateRecipientSocialDto) {
    return this.recipientSocialService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Recipient socialni o‘chirish" })
  remove(@Param("id") id: number) {
    return this.recipientSocialService.remove(id);
  }
}
