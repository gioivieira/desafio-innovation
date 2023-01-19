import { Request, Response } from "express-serve-static-core"
import { Customer } from "../../class/Customer"
import CustomersDatabase from "../../class/CustomersDatabase"

const createCustomer = async (req: Request, res: Response)=>{
    let errorCode = 400
    const customersDB = new CustomersDatabase()
    const {fullName, cpf, email, birthDate} = req.body

    try{
        if(!fullName && !cpf && !email && !birthDate){
            errorCode = 422
            throw new Error("Customer full name, cpf, email and date of birth are required.")
        } if(!fullName){
            errorCode = 422
            throw new Error("Full name required.")            
        } if(!cpf){
            errorCode = 422
            throw new Error("Cpf required.")
        } if(!email){
            errorCode = 422
            throw new Error("E-mail required.")
        } if(!birthDate){
            errorCode = 422
            throw new Error("Date of birth required.")
        }

        const allCustomers = await customersDB.getCustomers()
        const customerExisting = allCustomers.filter(customer => customer.cpf.toString() === cpf.toString())

        if(customerExisting.length > 0){
            errorCode = 409
            throw new Error("This customer already exists.")            
        }

        const newCustomer = new Customer (
            Date.now().toString(),
            fullName,
            cpf,
            email,
            birthDate,
            "ACTIVE",
            new Date()
        )

        await customersDB.createCustomer(newCustomer)

        res.status(201).end()
    }catch(err: any){
        res.status(errorCode).send(err.message)
    }
}

export default createCustomer