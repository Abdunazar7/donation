import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../user/models/user.model";
import { Shop } from "../../shop/models/shop.model";

export enum OrderStatus {
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

interface IOrderCreationAttr {
  location: string;
  userId: number;
  shopId: number;
  status: OrderStatus;
  quantity: number;
  total?: number;
}

@Table({ tableName: "order", freezeTableName: true })
export class Order extends Model<Order, IOrderCreationAttr> {
  @ApiProperty({ example: 1 })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ApiProperty({ example: "Tashkent, Street 1" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare location: string;

  @ForeignKey(() => User)
  @ApiProperty({ example: 1 })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @ForeignKey(() => Shop)
  @ApiProperty({ example: 2 })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare shopId: number;

  @ApiProperty({ enum: OrderStatus })
  @Column({
    type: DataType.ENUM("in_progress", "completed", "cancelled"),
    allowNull: false,
  })
  declare status: OrderStatus;

  @ApiProperty({ example: 2 })
  @Column({ type: DataType.SMALLINT, allowNull: false })
  declare quantity: number;

  @ApiProperty({
    example: 99.98,
    description: "total price (calculated)",
    required: false,
  })
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  declare total?: number;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Shop)
  declare shop: Shop;
}
