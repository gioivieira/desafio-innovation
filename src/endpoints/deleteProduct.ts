import { Request, Response } from "express-serve-static-core"
import ProductsDatabase from "../class/ProductsDatabase"

const deleteProduct = async (req: Request, res: Response)=>{
    let errorCode = 400
    const productsDB = new ProductsDatabase()
    const productId = req.params.productId

    try{
        if(!productId){
            errorCode = 422
            throw new Error("Product id required.")            
        }

        const allProducts = await productsDB.getProducts()
        const productExisting = allProducts.filter(product => product.id.toString() === productId.toString())

        if(productExisting.length < 1){
            errorCode = 404
            throw new Error("Product not found.")            
        }

        await productsDB.deleteProduct(productId)
        
        res.status(200).end()
    }catch(err: any){
        res.status(errorCode).send(err.message)
    }
}

export default deleteProduct