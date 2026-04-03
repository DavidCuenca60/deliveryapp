import express from "express"
import { StoresController } from "./stores.controller.js"
import { StoresRepository } from "./stores.repository.js"

const repository = new StoresRepository()
const controller = new StoresController(repository)

const router = express.Router()

router.get("/", controller.getAllStores)
router.get("/:id", controller.getStoreById)
router.put("/:id/status", controller.updateStoreStatus)
router.post("/", controller.createStore)

export default router