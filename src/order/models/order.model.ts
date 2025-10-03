import { Model, Table } from "sequelize-typescript";


interface IOrderCreationAttr {
    location: string,
    status: string,
    quantity: number,
}


@Table({tableName: "orders", freezeTableName: true
})
export class Order extends Model<Order, IOrderCreationAttr> {
    
}
