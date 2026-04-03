import express from "express"
import { OrdersController } from "./orders.controller.js"
import { OrdersRepository } from "./orders.repository.js"

const repository = new OrdersRepository()
const controller = new OrdersController(repository)

const router = express.Router()

router.get("/", controller.getAllOrders)
router.get("/:id", controller.getOrderById)
router.post("/", controller.createOrder)
router.put("/:id/accept", controller.acceptOrder)

export default router