import { Request, Response } from "express-serve-static-core"
import OrdersDatabase from "../../class/OrdersDatabase"
import ProductsDatabase from "../../class/ProductsDatabase"
import CustomersDatabase from "../../class/CustomersDatabase"
import { Order } from "../../class/Order"

const createOrder = async (req: Request, res: Response)=>{
    let errorCode = 400
    const ordersDB = new OrdersDatabase()
    const productsDB = new ProductsDatabase()
    const customersDB = new CustomersDatabase()
    const {productId, customerId, quantity} = req.body

    try{
        if(!productId && !customerId && quantity){
            errorCode = 422
            throw new Error("Product id, customer id and quantity are required.")
        } if(!productId){
            errorCode = 422
            throw new Error("Product id required.")            
        } if(!customerId){
            errorCode = 422
            throw new Error("Customer id required.")
        } if(!quantity){
            errorCode = 422
            throw new Error("Quantity required.")
        }

        const allProducts = await productsDB.getProducts()
        const productExisting = allProducts.filter(product => product.id.toString() === productId.toString())

        if(productExisting.length < 1){
            errorCode = 409
            throw new Error("Product not found.")            
        }

        const allCustomers = await customersDB.getCustomers()
        const customerExisting = allCustomers.filter(customer => customer.id.toString() === customerId.toString())

        if(customerExisting.length < 1){
            errorCode = 409
            throw new Error("Customer not found.")            
        }

        for(let product of allProducts){
            if(product.id.toString() === productId.toString()){
                if(product.quantity < quantity){
                    throw new Error("The quantity that the customer wants to order is larger than the available quantity of the product.")                    
                } if(product.quantity >= quantity){
                    await productsDB.updateProduct("quantity", product.quantity - quantity, productId)
                    await productsDB.updateProduct("updated_at", new Date(), productId)
                }             
            }
        }

        const newOrder = new Order(
            Date.now().toString(),
            new Date(),
            Number(quantity),
            productId,
            customerId
        )

        await ordersDB.createOrder(newOrder)

        res.status(201).end()
    }catch(err: any){
        res.status(errorCode).send(err.message)
    }
}

export default createOrder