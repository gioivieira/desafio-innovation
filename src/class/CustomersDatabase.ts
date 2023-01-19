import BaseDatabase from "./BaseDatabase"
import { Customer } from "./Customer"

class CustomersDatabase extends BaseDatabase{
    TABLE_NAME: string = "Customers"

    public async getCustomers(){
        const result = await super.getItems()
        return result
    }

    public async getCustomer(id: string){
        const result = await super.getItem(id)
        return result
    }

    public async updateCustomer(column: string, newInfo: any, id: string){
        await super.updateItem(column, newInfo, id)
    }

    public async createCustomer(item: Customer){
        await super.createItem(item)
    }
}

export default CustomersDatabase