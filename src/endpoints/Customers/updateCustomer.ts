import { Request, Response } from "express-serve-static-core"
import CustomersDatabase from "../../class/CustomersDatabase"
import { validateCustomerName, validateEmail, validateCustomerNameCaracteres } from "../../validations/validations"

const updateCustomer = async (req: Request, res: Response)=>{
    let errorCode = 400
    const customersDB = new CustomersDatabase()
    const {fullName, email} = req.body
    const customerId = req.params.customerId

    try{
        if(!customerId){
            errorCode = 422
            throw new Error("Customer id required.")            
        }
        if(!fullName && !email){
            errorCode = 422
            throw new Error("It is necessary to inform at least one of the following parameters to complete the request: full name or email.")            
        }

        const allCustomers = await customersDB.getCustomers()
        const customerExisting = allCustomers.filter(customer => customer.id.toString() === customerId.toString())

        if(customerExisting.length < 1){
            errorCode = 404
            throw new Error("Customer not found.")            
        }

        if(fullName){
            if(!validateCustomerNameCaracteres(fullName)){
                errorCode = 422
                throw new Error("Type your full name using at least 5 characters and no special characters.") 
            } if(!validateCustomerName(fullName)){
                errorCode = 422
                throw new Error("Invalid full name.")
            }
            await customersDB.updateCustomer("full_name", fullName, customerId)
        } if(email){
            if(!validateEmail(email)){
                errorCode = 422
                throw new Error("Invalid e-mail.")
            }
            await customersDB.updateCustomer("email", email, customerId) 
        }

        if(fullName || email){
            await customersDB.updateCustomer("updated_at", new Date(), customerId)
        }

        res.status(200).end()

    }catch(err: any){
        res.status(errorCode).send(err.message)
    }
}

export default updateCustomer