export class ProductsController {

    constructor(repository) {
        this.repository = repository
    }

    getAllProducts = async (req, res) => {
        const products = await this.repository.getAllProducts()
        res.send({ products })
    }

    getProductById = async (req, res) => {
        const id = Number(req.params.id)
        const product = await this.repository.getProductById(id)

        if (!product) {
            res.status(404).send({ message: "Producto no encontrado" })
            return
        }

        res.send(product)
    }

    createProduct = async (req, res) => {
        const { store_id, name, description, price } = req.body
        const product = await this.repository.createProduct(store_id, name, description, price)
        res.status(201).send(product)
    }

    updateProduct = async (req, res) => {
        const id = Number(req.params.id)
        const { name, description, price, available } = req.body
        const product = await this.repository.updateProduct(id, name, description, price, available)

        if (!product) {
            res.status(404).send({ message: "Producto no encontrado" })
            return
        }

        res.send(product)
    }
}