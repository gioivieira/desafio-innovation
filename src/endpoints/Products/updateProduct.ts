import { Request, Response } from "express-serve-static-core"
import ProductsDatabase from "../../class/ProductsDatabase"
import { validateProductName, validateCategory} from "../../validations/validations"

const updateProduct = async (req: Request, res: Response)=>{
    let errorCode = 400
    const productsDB = new ProductsDatabase()
    const {name, category, quantity, price} = req.body
    const productId = req.params.productId

    try{
        if(!productId){
            errorCode = 422
            throw new Error("Product id required.")            
        } if(!name && !category && !quantity && !price){
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
            if(!validateProductName(name)){
                errorCode = 422
                throw new Error("Product name must be at least 4 characters long.") 
            }
            await productsDB.updateProduct("name", name, productId)
        } if(category){
            if(!validateCategory(category)){
                errorCode = 422
                throw new Error("Product category must be at least 4 characters long.") 
            }
            await productsDB.updateProduct("category", category, productId) 
        } if(quantity){
            if(typeof(quantity) !== "number"){
                errorCode = 422
                throw new Error("The quantity has to be a number.")
            }
            await productsDB.updateProduct("quantity", Number(quantity), productId)
        } if(price){
            if(typeof(price) !== "number"){
                errorCode = 422
                throw new Error("The price has to be a number.")
            }
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