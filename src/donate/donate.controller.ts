import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DonateService } from "./donate.service";
import { CreateDonateDto, UpdateDonateDto } from "./dto/create-donate.dto";
import { Donate } from "./models/donate.model";

@ApiTags("Donate")
@Controller("donate")
export class DonateController {
  constructor(private readonly donateService: DonateService) {}

  @Post()
  @ApiOperation({ summary: "Create a new donation" })
  @ApiResponse({ status: 201, type: Donate })
  create(@Body() dto: CreateDonateDto) {
    return this.donateService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all donations" })
  @ApiResponse({ status: 200, type: [Donate] })
  findAll() {
    return this.donateService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get donation by ID" })
  @ApiResponse({ status: 200, type: Donate })
  findOne(@Param("id") id: string) {
    return this.donateService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update donation" })
  update(@Param("id") id: string, @Body() dto: UpdateDonateDto) {
    return this.donateService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete donation" })
  remove(@Param("id") id: string) {
    return this.donateService.remove(+id);
  }
}
