import { Request, Response } from "express-serve-static-core"
import CustomersDatabase from "../../class/CustomersDatabase"

const inactivateCustomer = async (req: Request, res: Response)=>{
    let errorCode = 400
    const customersDB = new CustomersDatabase()
    const customerId = req.params.CustomerId

    try{
        if(!customerId){
            errorCode = 422
            throw new Error("Customer id required.")            
        } 
        
        const allCustomers = await customersDB.getCustomers()
        const customerExisting = allCustomers.filter(customer => customer.id.toString() === customerId.toString())

        if(customerExisting.length < 1){
            errorCode = 404
            throw new Error("Customer not found.")            
        }

        await customersDB.updateCustomer("status", "INACTIVE", customerId)
        await customersDB.updateCustomer("updated_at", new Date(), customerId)
        await customersDB.updateCustomer("deleted_at", new Date(), customerId)

        res.status(200).end()                
    }catch(err: any){
        res.status(errorCode).send(err.message)
    }
}

export default inactivateCustomer