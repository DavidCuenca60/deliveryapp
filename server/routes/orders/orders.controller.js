export class OrdersController {

    constructor(repository) {
        this.repository = repository
    }

    getAllOrders = async (req, res) => {
        const orders = await this.repository.getAllOrders()
        res.send({ orders })
    }

    getOrderById = async (req, res) => {
        const id = Number(req.params.id)
        const order = await this.repository.getOrderById(id)

        if (!order) {
            res.status(404).send({ message: "Orden no encontrada" })
            return
        }

        res.send(order)
    }

    createOrder = async (req, res) => {
        const { user_id, store_id, total, address, payment_method } = req.body
        const order = await this.repository.createOrder(user_id, store_id, total, address, payment_method)
        res.status(201).send(order)
    }

    acceptOrder = async (req, res) => {
        const id = Number(req.params.id)
        const { driver_id } = req.body
        const order = await this.repository.acceptOrder(id, driver_id)

        if (!order) {
            res.status(404).send({ message: "Orden no encontrada" })
            return
        }

        res.send(order)
    }
}