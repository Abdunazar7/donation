import { Table, Column, Model, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface IUserCreationAttr {
  full_name: string;
  email: string;
  password: string;
  card_number: string;
  token: string;
  is_active: boolean;
}

@Table({ tableName: "user", freezeTableName: true })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    example: "1",
    description: "User id",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: "Ali Valiyev" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare full_name: string;

  @ApiProperty({ example: "ali@mail.com" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  @ApiProperty({
    example: "1234567",
    description: "User password",
  })
  @Column({
    type: DataType.STRING(100),
  })
  declare password: string;

  @ApiProperty({ example: "8600 1234 5678 9012" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare card_number: string;

  @ApiProperty({ example: "randomToken123" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare token: string;

  @ApiProperty({ example: true })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: string;
}
