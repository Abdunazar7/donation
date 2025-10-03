import { DataType, PrimaryKey, Table, Column, Model, AllowNull } from "sequelize-typescript";


interface IShopCreationAttr {
    name: string;
    count: number;
    price: number;
    title: string;
    description: string;
}

@Table({ tableName: "shops", freezeTableName: true })
export class Shop extends Model<Shop, IShopCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
 })
  declare count: number;

  @Column({
    type: DataType.DECIMAL(15,2),
  })
  declare price: number;

  @Column({
    type: DataType.STRING,
  })
  declare title: string;

  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  
}
