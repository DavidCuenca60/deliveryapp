export class DriversController {

    constructor(repository) {
        this.repository = repository
    }

    getAllDrivers = async (req, res) => {
        const drivers = await this.repository.getAllDrivers()
        res.send({ drivers })
    }

    getDriverById = async (req, res) => {
        const id = Number(req.params.id)
        const driver = await this.repository.getDriverById(id)

        if (!driver) {
            res.status(404).send({ message: "Repartidor no encontrado" })
            return
        }

        res.send(driver)
    }

    updateAvailability = async (req, res) => {
        const id = Number(req.params.id)
        const { is_available } = req.body
        const driver = await this.repository.updateAvailability(id, is_available)

        if (!driver) {
            res.status(404).send({ message: "Repartidor no encontrado" })
            return
        }

        res.send(driver)
    }
}