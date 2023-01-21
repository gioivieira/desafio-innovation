import { Request, Response } from "express-serve-static-core"
import { Customer } from "../../class/Customer"
import CustomersDatabase from "../../class/CustomersDatabase"
import { validateCustomerNameCaracteres, validateCustomerName, validateCpf, isCpfValid, validateEmail, validateBirthDate } from "../../validations/validations"

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
        } if(!validateCustomerNameCaracteres(fullName)){
            errorCode = 422
            throw new Error("Type your full name using at least 5 characters and no special characters.") 
        } if(!validateCustomerName(fullName)){
            errorCode = 422
            throw new Error("Invalid full name.")
        } if(!cpf){
            errorCode = 422
            throw new Error("Cpf required.")
        } if(!validateCpf(cpf)){
            errorCode = 422
            throw new Error("Type your CPF in the following format, using special characters: 111.111.111-11.")
        } if(!isCpfValid(cpf)){
            errorCode = 422
            throw new Error("Invalid CPF number.")
        } if(!email){
            errorCode = 422
            throw new Error("E-mail required.")
        } if(!validateEmail(email)){
            errorCode = 422
            throw new Error("Invalid e-mail.")
        } if(!birthDate){
            errorCode = 422
            throw new Error("Date of birth required.")
        } if(!validateBirthDate(birthDate)){
            errorCode = 422
            throw new Error("Type your birth date in the following format, using special characters: YYYY-MM-DD.")
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