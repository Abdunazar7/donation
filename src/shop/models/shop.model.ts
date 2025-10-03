import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Recipient } from "../../recipient/models/recipient.model";
import { Category } from "../../category/models/category.model";

interface IShopCreationAttr {
  name: string;
  count: number;
  price: number;
  title: string;
  recipientId: number;
  categoryId: number;
  description: string;
}

@Table({ tableName: "shop", freezeTableName: true })
export class Shop extends Model<Shop, IShopCreationAttr> {
  @ApiProperty({ example: 1 })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ApiProperty({ example: "Medicine pack" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ApiProperty({ example: 10 })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare count: number;

  @ApiProperty({ example: 49.99 })
  @Column({ type: DataType.DECIMAL(8, 2), allowNull: false })
  declare price: number;

  @ApiProperty({ example: "Pain relief tablets" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @ForeignKey(() => Recipient)
  @ApiProperty({ example: 1 })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare recipientId: number;

  @ForeignKey(() => Category)
  @ApiProperty({ example: 2 })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare categoryId: number;

  @ApiProperty({ example: "Detailed description", type: String })
  @Column({ type: DataType.TEXT, allowNull: false })
  declare description: string;

  @BelongsTo(() => Recipient)
  declare recipient: Recipient;

  @BelongsTo(() => Category)
  declare category: Category;
}
