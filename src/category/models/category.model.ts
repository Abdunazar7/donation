import { Table, Column, Model, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface ICategoryCreationAttr {
  name: string;
}

@Table({ tableName: "category", freezeTableName: true })
export class Category extends Model<Category, ICategoryCreationAttr> {
  @ApiProperty({ example: 1 })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ApiProperty({ example: "Health", description: "Category name" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;
}
