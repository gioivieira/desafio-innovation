import { Request, Response } from "express-serve-static-core"
import ProductsDatabase from "../../class/ProductsDatabase"

const updateProduct = async (req: Request, res: Response)=>{
    let errorCode = 400
    const productsDB = new ProductsDatabase()
    const {name, category, quantity, price} = req.body
    const productId = req.params.productId

    try{
        if(!productId){
            errorCode = 422
            throw new Error("Product id required.")            
        } if(price){
            if(isNaN(price)){
                errorCode = 422
                throw new Error("The price has to be a number.")
            } if(Number(price) <= 0){
                errorCode = 422
                throw new Error("The price must be greater than 0.")
            }
        } if(quantity){
            if(Number(quantity) <= 0){
                errorCode = 422
                throw new Error("The quantity must be greater than 0.")
            }
        }
        if(!name && !category && !quantity && !price){
            errorCode = 422
            throw new Error("It is necessary to inform at least one of the following parameters to complete the request: name, category, quantity or price.")            
        } 

        const allProducts = await productsDB.getProducts()
        const productExisting = allProducts.filter(product => product.id.toString() === productId.toString())

        if(productExisting.length < 1){
            errorCode = 404
            throw new Error("Product not found.")            
        }

        if(name){
            await productsDB.updateProduct("name", name, productId)
        } if(category){
            await productsDB.updateProduct("category", category, productId) 
        } if(quantity){
            await productsDB.updateProduct("quantity", Number(quantity), productId)
        } if(price){
            await productsDB.updateProduct("price", Number(price), productId)
        }

        if(name || category || quantity || price){
            await productsDB.updateProduct("updated_at", new Date(), productId)
        }

        res.status(200).end()
    }catch(err: any){
        res.status(errorCode).send(err.message)
    }
}

export default updateProduct