import { Request, Response } from "express-serve-static-core"
import { Product } from "../../class/Product"
import ProductsDatabase from "../../class/ProductsDatabase"
import { validateCategory, validateProductName } from "../../validations/validations"

const createProduct = async (req: Request, res: Response)=>{
    let errorCode = 400
    const productsDB = new ProductsDatabase()
    const {name, category, quantity, price} = req.body

    try{
        if(!name && !category && !quantity && !price){
            errorCode = 422
            throw new Error("Product name, category, price and quantity are required.")
        } if(!name){
            errorCode = 422
            throw new Error("Product name required.")            
        } if(!validateProductName(name)){
            errorCode = 422
            throw new Error("Product name must be at least 4 characters long.") 
        } if(!category){
            errorCode = 422
            throw new Error("Product category required.")
        } if(!validateCategory(category)){
            errorCode = 422
            throw new Error("Product category must be at least 4 characters long.") 
        } if(!quantity){
            errorCode = 422
            throw new Error("Product quantity required.")
        } if(typeof(quantity) !== "number"){
            errorCode = 422
            throw new Error("The quantity has to be a number.")
        } if(!price){
            errorCode = 422
            throw new Error("Product price required.")
        } if(typeof(price) !== "number"){
            errorCode = 422
            throw new Error("The price has to be a number.")
        } if(Number(quantity) <= 0){
            errorCode = 422
            throw new Error("The quantity must be greater than 0.")
        } if(Number(price) <= 0){
            errorCode = 422
            throw new Error("The price must be greater than 0.")
        }

        const allProducts = await productsDB.getProducts()
        const productExisting = allProducts.filter(product => product.name.toString() === name.toString())

        if(productExisting.length > 0){
            errorCode = 409
            throw new Error("This product already exists.")            
        }

        const newProduct = new Product(
            Date.now().toString(),
            name,
            category,
            Number(price), 
            'ACTIVE',
            Number(quantity),
            new Date()
        )

        await productsDB.createProduct(newProduct)

        res.status(201).end()
    }catch(err: any){
        res.status(errorCode).send(err.message)
    }
}

export default createProduct