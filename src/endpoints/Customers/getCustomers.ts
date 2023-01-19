import { Request, Response } from "express-serve-static-core"
import CustomersDatabase from "../../class/CustomersDatabase"

const getCustomers = async(req: Request, res: Response)=>{
    let errorCode = 400
    const customersDB = new CustomersDatabase()

    try{
        const allCustomers = await customersDB.getCustomers()

        if(allCustomers.length < 1){
            errorCode = 404
            throw new Error("Empty list.")            
        }

        res.status(200).send(allCustomers)
    }catch(err: any){
        res.status(errorCode).send(err.message)
    }
}

export default getCustomers