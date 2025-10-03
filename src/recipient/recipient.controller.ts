import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Put,
} from "@nestjs/common";
import { RecipientService } from "./recipient.service";
import { CreateRecipientDto } from "./dto/create-recipient.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Recipient } from "./models/recipient.model";

@ApiTags("Recipients")
@Controller("recipients")
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

  @Post()
  @ApiOperation({ summary: "Create new recipient" })
  @ApiResponse({ status: 201, type: Recipient })
  create(@Body() dto: CreateRecipientDto) {
    return this.recipientService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all recipients" })
  @ApiResponse({ status: 200, type: [Recipient] })
  findAll() {
    return this.recipientService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get one by id" })
  @ApiResponse({ status: 200, type: Recipient })
  findOne(@Param("id") id: number) {
    return this.recipientService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update recipient" })
  @ApiResponse({ status: 200, type: Recipient })
  update(@Param("id") id: number, @Body() dto: CreateRecipientDto) {
    return this.recipientService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete recipient" })
  remove(@Param("id") id: number) {
    return this.recipientService.remove(id);
  }
}
