import { Request, Response } from "express"
import OrdersDatabase from "../../class/OrdersDatabase"

const deleteOrder = async (req: Request, res: Response)=>{
    let errorCode = 400
    let ordersDB = new OrdersDatabase()
    let orderId = req.params.orderId

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

        await ordersDB.deleteOrder(orderId)

        res.status(200).end()
    }catch(err: any){
        res.status(errorCode).send(err.message)
    }
}

export default deleteOrder