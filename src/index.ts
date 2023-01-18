import app from "./app"
import createProduct from "./endpoints/createProduct"
import deleteProduct from "./endpoints/deleteProduct"
import getProduct from "./endpoints/getProduct"
import getProducts from "./endpoints/getProducts"
import inactivateProduct from "./endpoints/inactivateProduct"
import updateProduct from "./endpoints/updateProduct"

app.get("/products", getProducts)

app.get("/products/:productId", getProduct)

app.post("/products", createProduct)

app.patch("/products/:productId", updateProduct)

app.put("/products/:productId", inactivateProduct)

app.delete("/products/:productId", deleteProduct)
