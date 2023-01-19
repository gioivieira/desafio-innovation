import { Request, Response } from "express-serve-static-core"
import CustomersDatabase from "../../class/CustomersDatabase"

const getCustomer = async (req: Request, res: Response)=>{
    let errorCode = 400
    const customersDB = new CustomersDatabase()
    const customerId = req.params.customerId

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

        const result = await customersDB.getCustomer(customerId)

        res.status(200).send(result)
    }catch(err: any){
        res.status(errorCode).send(err.message)
    }
}

export default getCustomer