import app from "./app"
import createCustomer from "./endpoints/Customers/createCustomer"
import getCustomer from "./endpoints/Customers/getCustomer"
import getCustomers from "./endpoints/Customers/getCustomers"
import inactivateCustomer from "./endpoints/Customers/inactivateCustomer"
import updateCustomer from "./endpoints/Customers/updateCustomer"
import createOrder from "./endpoints/Orders/createOrder"
import deleteOrder from "./endpoints/Orders/deleteOrder"
import getOrder from "./endpoints/Orders/getOrder"
import getOrders from "./endpoints/Orders/getOrders"
import createProduct from "./endpoints/Products/createProduct"
import getProduct from "./endpoints/Products/getProduct"
import getProducts from "./endpoints/Products/getProducts"
import inactivateProduct from "./endpoints/Products/inactivateProduct"
import updateProduct from "./endpoints/Products/updateProduct"

//Products endpoints

app.get("/products", getProducts)

app.get("/products/:productId", getProduct)

app.post("/products", createProduct)

app.patch("/products/:productId", updateProduct)

app.put("/products/:productId", inactivateProduct)

//Customers endpoints

app.get("/customers", getCustomers)

app.get("/customers/:customerId", getCustomer)

app.post("/customers", createCustomer)

app.patch("/customers/:customerId", updateCustomer)

app.put("/customers/:customerId", inactivateCustomer)

//Orders endpoints

app.get("/orders", getOrders)

app.get("/orders/:orderId", getOrder)

app.post("/orders", createOrder)

app.delete("/orders/:orderId", deleteOrder)