import BaseDatabase from "./BaseDatabase"
import { Product } from "./Product"

class ProductsDatabase extends BaseDatabase{
    TABLE_NAME: string = "Products"

    public async getProducts(){
        const result = await super.getItems()
        return result
    }

    public async getProduct(id: string){
        const result = await super.getItem(id)
        return result
    }

    public async updateProduct(column: string, newInfo: any, id: string){
        await super.updateItem(column, newInfo, id)
    }

    public async createProduct(item: Product){
        await super.createItem(item)
    }

    public async deleteProduct(id: string){
        await super.deleteItem(id)
    }
}

export default ProductsDatabase