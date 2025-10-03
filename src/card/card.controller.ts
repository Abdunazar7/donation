import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Put,
} from "@nestjs/common";
import { CardService } from "./card.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Card } from "./models/card.model";

@ApiTags("Cards")
@Controller("cards")
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @ApiOperation({ summary: "Create new card" })
  @ApiResponse({ status: 201, type: Card })
  create(@Body() dto: CreateCardDto) {
    return this.cardService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all cards" })
  @ApiResponse({ status: 200, type: [Card] })
  findAll() {
    return this.cardService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get card by id" })
  @ApiResponse({ status: 200, type: Card })
  findOne(@Param("id") id: number) {
    return this.cardService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update card" })
  update(@Param("id") id: number, @Body() dto: CreateCardDto) {
    return this.cardService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete card" })
  remove(@Param("id") id: number) {
    return this.cardService.remove(id);
  }
}
