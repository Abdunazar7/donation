import { ApiProperty } from "@nestjs/swagger";
import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Recipient } from "../../recipient/models/recipient.model";
import { User } from "../../user/models/user.model";

interface IDonateCreationAttr {
  recipient_id: number;
  user_id: number;
  notification: string;
  is_AnonimPay: boolean;
}

@Table({ tableName: "donate" })
export class Donate extends Model<Donate, IDonateCreationAttr> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 3, description: "Recipient ID" })
  @ForeignKey(() => Recipient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare recipient_id: number;

  @ApiProperty({ example: 5, description: "User ID" })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare user_id: number;

  @ApiProperty({ example: "Thanks for your donation!" })
  @Column({ type: DataType.TEXT, allowNull: false })
  declare notification: string;

  @ApiProperty({ example: false, description: "Anonymous payment" })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare is_AnonimPay: boolean;

  @BelongsTo(() => Recipient)
  recipient: Recipient;

  @BelongsTo(() => User)
  user: User;
}
