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
    let totalValue;
    const {productId, customerId, quantity} = req.body

    try{
        const allProducts = await productsDB.getProducts()
        const allCustomers = await customersDB.getCustomers()

        const productInactivate = allProducts.filter(product => product.status.toString() === "INACTIVE")

        for(let product of productInactivate){
            if(product.id.toString() === productId.toString()){
                throw new Error("This product is inactive.")
            }
        }

        const customerInactivate = allCustomers.filter(customer => customer.status.toString() === "INACTIVE")

        for(let customer of customerInactivate){
            if(customer.id.toString() === customerId.toString()){
                throw new Error("This customer is inactive.")
            }
        }

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
        } if(typeof(quantity) !== "number"){
            errorCode = 422
            throw new Error("The quantity has to be a number.")
        } if(Number(quantity) <= 0){
            errorCode = 422
            throw new Error("The quantity must be greater than 0.")
        }

        const productExisting = allProducts.filter(product => product.id.toString() === productId.toString())

        if(productExisting.length < 1){
            errorCode = 409
            throw new Error("Product not found.")            
        }

        const customerExisting = allCustomers.filter(customer => customer.id.toString() === customerId.toString())

        if(customerExisting.length < 1){
            errorCode = 409
            throw new Error("Customer not found.")            
        }

        for(let product of allProducts){
            if(product.id.toString() === productId.toString()){
                if(product.quantity < Number(quantity)){
                    throw new Error("The quantity that the customer wants to order is larger than the available quantity of the product.")                    
                } if(product.quantity >= Number(quantity)){
                    await productsDB.updateProduct("quantity", product.quantity - Number(quantity), productId)
                    await productsDB.updateProduct("updated_at", new Date(), productId)
                    totalValue = Number(quantity) * product.price
                }             
            }
        }

        const newOrder = new Order(
            Date.now().toString(),
            new Date(),
            Number(quantity),
            Number(totalValue),
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