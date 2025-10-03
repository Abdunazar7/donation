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
  @ApiOperation({ summary: "Add a social media link to the recipient" })
  @ApiResponse({ status: 201, type: RecipientSocial })
  create(@Body() dto: CreateRecipientSocialDto) {
    return this.recipientSocialService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all links" })
  findAll() {
    return this.recipientSocialService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get link by id" })
  findOne(@Param("id") id: number) {
    return this.recipientSocialService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update recipient's link" })
  update(@Param("id") id: number, @Body() dto: CreateRecipientSocialDto) {
    return this.recipientSocialService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete recipient's link" })
  remove(@Param("id") id: number) {
    return this.recipientSocialService.remove(id);
  }
}
