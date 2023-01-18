import { Request, Response } from "express-serve-static-core"
import ProductsDatabase from "../class/ProductsDatabase"

const getProducts = async(req: Request, res: Response)=>{
    let errorCode = 400
    const productsDB = new ProductsDatabase()

    try{
        const allProducts = await productsDB.getProducts()

        if(allProducts.length < 1){
            errorCode = 404
            throw new Error("Empty list.")            
        }

        res.status(200).send(allProducts)
    }catch(err: any){
        res.status(errorCode).send(err.message)
    }
}

export default getProducts