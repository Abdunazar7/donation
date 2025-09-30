import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Recipient } from "../../recipient/models/recipient.model";
import { SocialMedia } from "../../social-media/models/social-media.model";

interface IRecipientSocialCreationAttr {
  socialId: number;
  recipientId: number;
  social_url: string;
}

@Table({ tableName: "Recipient-social", freezeTableName: true })
export class RecipientSocial extends Model<
  RecipientSocial,
  IRecipientSocialCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => SocialMedia)
  @Column({ type: DataType.INTEGER })
  declare socialId: number;

  @ForeignKey(() => Recipient)
  @Column({ type: DataType.INTEGER })
  declare recipientId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare social_url: string;

  @BelongsTo(() => SocialMedia)
  declare social: SocialMedia;

  @BelongsTo(() => Recipient)
  declare recipient: Recipient;
}
