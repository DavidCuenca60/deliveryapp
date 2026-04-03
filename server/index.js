import express from "express"
import cors from "cors"
import StoresRouter from "./routes/stores/stores.router.js"
import ProductsRouter from "./routes/products/products.router.js"
import OrdersRouter from "./routes/orders/orders.router.js"
import DriversRouter from "./routes/drivers/drivers.router.js"

const PORT = 8080
const app = express()

app.use(cors())
app.use(express.json())

app.use("/stores", StoresRouter)
app.use("/products", ProductsRouter)
app.use("/orders", OrdersRouter)
app.use("/drivers", DriversRouter)

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto:", PORT)
})