import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Recipient } from "../../recipient/models/recipient.model";

interface ICardCreationAttr {
  card_type: string;
  card_number: string;
  expiry_date: string;
  recipientId: number;
}

@Table({ tableName: "cards", freezeTableName: true })
export class Card extends Model<Card, ICardCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare card_type: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare card_number: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare expiry_date: string;

  @ForeignKey(() => Recipient)
  @Column({ type: DataType.INTEGER })
  declare recipientId: number;

  @BelongsTo(() => Recipient)
  declare recipient: Recipient;
}
