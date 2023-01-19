import { Request, Response } from "express-serve-static-core"
import { Product } from "../../class/Product"
import ProductsDatabase from "../../class/ProductsDatabase"

const createProduct = async (req: Request, res: Response)=>{
    let errorCode = 400
    const productsDB = new ProductsDatabase()
    const {name, category, quantity} = req.body

    try{
        if(!name && !category && !quantity){
            errorCode = 422
            throw new Error("Product name, category and quantity are required.")
        } if(!name){
            errorCode = 422
            throw new Error("Name required.")            
        } if(!category){
            errorCode = 422
            throw new Error("Category required.")
        } if(!quantity){
            errorCode = 422
            throw new Error("Quantity required.")
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