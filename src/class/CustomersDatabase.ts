import BaseDatabase from "./BaseDatabase"
import { Customer } from "./Customer"

class CustumersDatabase extends BaseDatabase{
    TABLE_NAME: string = "Costumers"

    public async getCustomers(){
        const result = await super.getItems()
        return result
    }

    public async getCustomer(id: string){
        const result = await super.getItem(id)
        return result
    }

    public async updateCostumer(column: string, newInfo: any, id: string){
        await super.updateItem(column, newInfo, id)
    }

    public async createCustomer(item: Customer){
        await super.createItem(item)
    }

    public async deleteCustomer(id: string){
        await super.deleteItem(id)
    }
}

export default CustumersDatabase