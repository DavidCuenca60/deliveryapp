export class StoresController {

    constructor(repository) {
        this.repository = repository
    }

    getAllStores = async (req, res) => {
        const stores = await this.repository.getAllStores()
        res.send({ stores })
    }

    getStoreById = async (req, res) => {
        const id = Number(req.params.id)
        const store = await this.repository.getStoreById(id)

        if (!store) {
            res.status(404).send({ message: "Tienda no encontrada" })
            return
        }

        res.send(store)
    }

    updateStoreStatus = async (req, res) => {
        const id = Number(req.params.id)
        const { is_open } = req.body
        const store = await this.repository.updateStoreStatus(id, is_open)

        if (!store) {
            res.status(404).send({ message: "Tienda no encontrada" })
            return
        }

        res.send(store)
    }

    createStore = async (req, res) => {
        const { name, address, category } = req.body
        const store = await this.repository.createStore(name, address, category)
        res.status(201).send(store)
    }
}