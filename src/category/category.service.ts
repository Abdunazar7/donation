import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "./models/category.model";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async create(dto: CreateCategoryDto) {
    const exist = await this.categoryModel.findOne({
      where: { name: dto.name },
    });
    if (exist)
      throw new ConflictException("Category with this name already exists");
    return this.categoryModel.create(dto);
  }

  findAll() {
    return this.categoryModel.findAll();
  }

  async findOne(id: number) {
    const cat = await this.categoryModel.findByPk(id);
    if (!cat) throw new NotFoundException(`Category with ID ${id} not found`);
    return cat;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const cat = await this.findOne(id);
    return cat.update(dto);
  }

  async remove(id: number) {
    const cat = await this.findOne(id);
    await cat.destroy();
    return { message: `Category ${id} deleted` };
  }
}
