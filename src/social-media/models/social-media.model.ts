import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { RecipientSocial } from "../../recipient-social/models/recipient-social.model";

interface ISocialMediaCreationAttr {
  social_media: string;
  iconic_url: string;
}

@Table({ tableName: "social_media", freezeTableName: true })
export class SocialMedia extends Model<SocialMedia, ISocialMediaCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare social_media: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare iconic_url: string;

  @HasMany(() => RecipientSocial)
  declare recipientSocials: RecipientSocial[];
}
