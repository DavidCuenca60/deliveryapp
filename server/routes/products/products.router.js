import express from "express"
import { ProductsController } from "./products.controller.js"
import { ProductsRepository } from "./products.repository.js"

const repository = new ProductsRepository()
const controller = new ProductsController(repository)

const router = express.Router()

router.get("/", controller.getAllProducts)
router.get("/:id", controller.getProductById)
router.post("/", controller.createProduct)
router.put("/:id", controller.updateProduct)

export default router