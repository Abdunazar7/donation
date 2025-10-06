import { ApiProperty } from "@nestjs/swagger";
import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../../user/models/user.model";
import { Donate } from "../../donate/models/donate.model";
import { Order } from "../../order/models/order.model";

export enum PaymentMethod {
  PAYME = "payme",
  CLICK = "click",
  UZUM = "uzum",
}

export enum PaymentStatus {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
  REFUNDED = "refunded",
}

interface IPaymentCreationAttr {
  user_id: number;
  donate_id: number;
  order_id: number;
  payment_method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  payment_date: Date;
}

@Table({ tableName: "payments" })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
  @ApiProperty()
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare user_id: number;

  @ForeignKey(() => Donate)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare donate_id: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare order_id: number;

  @ApiProperty({ enum: PaymentMethod })
  @Column({
    type: DataType.ENUM(...Object.values(PaymentMethod)),
    allowNull: false,
  })
  declare payment_method: PaymentMethod;

  @ApiProperty({ enum: PaymentStatus })
  @Column({
    type: DataType.ENUM(...Object.values(PaymentStatus)),
    allowNull: false,
  })
  declare status: PaymentStatus;

  @ApiProperty({ example: 250000 })
  @Column({ type: DataType.DECIMAL(8, 2), allowNull: false })
  declare amount: number;

  @ApiProperty({ example: "2025-10-06" })
  @Column({ type: DataType.DATE, allowNull: false })
  declare payment_date: Date;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Donate)
  declare donate: Donate;

  @BelongsTo(() => Order)
  declare order: Order;
}
