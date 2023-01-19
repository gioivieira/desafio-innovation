import { Request, Response } from "express-serve-static-core"
import OrdersDatabase from "../../class/OrdersDatabase"
import ProductsDatabase from "../../class/ProductsDatabase"
import CustomersDatabase from "../../class/CustomersDatabase"

const getOrder = async (req: Request, res: Response)=>{
    let errorCode = 400
    let product;
    let customer;
    let order;
    const ordersDB = new OrdersDatabase()
    const productsDB = new ProductsDatabase()
    const customersDB = new CustomersDatabase()
    const orderId = req.params.orderId

    try{
        if(!orderId){
            errorCode = 422
            throw new Error("Order id required.")            
        }

        const allOrders = await ordersDB.getOrders()
        const orderExisting = allOrders.filter(order => order.id.toString() === orderId.toString())

        if(orderExisting.length < 1){
            errorCode = 404
            throw new Error("Order not found.")            
        }

        order = await ordersDB.getOrder(orderId)

        for(let order of allOrders){
            product = await productsDB.getProduct(order.fk_products)
            customer = await customersDB.getCustomer(order.fk_customers)
        }

        const orderDetails = {
            order,
            customer,
            product
        }

        res.status(200).send([orderDetails])
    }catch(err: any){
        res.status(errorCode).send(err.message)
    }
}

export default getOrder