import { BlobOptions } from "buffer";
import {
  Model,
  Table,
  DataType,
  Column,
} from "sequelize-typescript";

interface IAdmincreationAttr {
  full_name: string;
  email: string;
  password: string;
  is_active: boolean;
  is_creator: boolean;
  token: string;
}

@Table({ tableName: "admins", freezeTableName: true })
export class Admin extends Model<Admin, IAdmincreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare full_name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_acive: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_creator: boolean;

  @Column({
    type: DataType.STRING,
    defaultValue: false,
  })
  declare token: string;
}
