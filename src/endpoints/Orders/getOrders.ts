import { Request, Response } from "express-serve-static-core"
import OrdersDatabase from "../../class/OrdersDatabase"
import ProductsDatabase from "../../class/ProductsDatabase"
import CustomersDatabase from "../../class/CustomersDatabase"

const getOrders = async(req: Request, res: Response)=>{
    let errorCode = 400
    let product;
    let customer;
    let orders: any[] = []
    const ordersDB = new OrdersDatabase()
    const productsDB = new ProductsDatabase()
    const customersDB = new CustomersDatabase()

    try{
        const allOrders = await ordersDB.getOrders()

        if(allOrders.length < 1){
            errorCode = 404
            throw new Error("Empty list.")            
        }

        for(let order of allOrders){             
            product = await productsDB.getProduct(order.fk_products)
            customer = await customersDB.getCustomer(order.fk_customers)

            order = {
                order,
                product,
                customer
            }

            orders.push(order)
        }

        res.status(200).send(orders)
    }catch(err: any){
        res.status(errorCode).send(err.message)
    }
}

export default getOrders