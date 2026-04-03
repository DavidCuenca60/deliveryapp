import express from "express"
import { DriversController } from "./drivers.controller.js"
import { DriversRepository } from "./drivers.repository.js"

const repository = new DriversRepository()
const controller = new DriversController(repository)

const router = express.Router()

router.get("/", controller.getAllDrivers)
router.get("/:id", controller.getDriverById)
router.put("/:id/availability", controller.updateAvailability)

export default router