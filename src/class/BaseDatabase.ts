import knex from 'knex'
import dotenv from 'dotenv'
import { Product } from './Product'

dotenv.config()

abstract class BaseDatabase {
    static connection = knex({
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            multipleStatements: true
        }
    })

    abstract TABLE_NAME: string

    protected async getItems(){
        const result = await BaseDatabase.connection(this.TABLE_NAME).select("*")
        return result
    }

    protected async getItem(id: string){
        const result = await BaseDatabase.connection(this.TABLE_NAME).select("*").whereLike("id", id)
        return result
    }

    protected async updateItem(column: string, newInfo: any, id: string){
        await BaseDatabase.connection(this.TABLE_NAME).update(column, newInfo).whereLike("id", id)
    }

    protected async createItem(item: Product){
        await BaseDatabase.connection(this.TABLE_NAME).insert(item)
    }

    protected async deleteItem(id: string){
        await BaseDatabase.connection(this.TABLE_NAME).whereILike("id", id).del()
    }
}

export default BaseDatabase