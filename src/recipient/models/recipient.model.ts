import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Card } from "../../card/models/card.model";
import { RecipientSocial } from "../../recipient-social/models/recipient-social.model";

interface IRecipientCreationAttr {
  name: string;
  full_name: string;
  email: string;
  password: string;
  card_number: string;
  addres: string;
}

@Table({ tableName: "Recipient", freezeTableName: true })
export class Recipient extends Model<Recipient, IRecipientCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare full_name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.STRING })
  declare card_number: string;

  @Column({ type: DataType.STRING })
  declare token: string;

  @Column({ type: DataType.STRING })
  declare addres: string;

  @HasMany(() => Card)
  declare cards: Card[];

  @HasMany(() => RecipientSocial)
  declare socials: RecipientSocial[];
}
