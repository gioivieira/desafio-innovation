import BaseDatabase from "./BaseDatabase"
import { Order } from "./Order"

class OrdersDatabase extends BaseDatabase{
    TABLE_NAME: string = "Orders"
    public async getOrders(){
        const result = await super.getItems()
        return result
    }

    public async getOrder(id: string){
        const result = await super.getItem(id)
        return result
    }

    public async updateOrder(column: string, newInfo: any, id: string){
        await super.updateItem(column, newInfo, id)
    }

    public async createOrder(item: Order){
        await super.createItem(item)
    }
}

export default OrdersDatabase