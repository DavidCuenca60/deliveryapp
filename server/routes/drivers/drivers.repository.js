import { pool } from "../clients/supabase-db.js"

export class DriversRepository {

    getAllDrivers = async () => {
        const result = await pool.query("SELECT * FROM drivers")
        return result.rows
    }

    getDriverById = async (id) => {
        const result = await pool.query(
            "SELECT * FROM drivers WHERE id = $1", [id]
        )
        return result.rows[0]
    }

    updateAvailability = async (id, is_available) => {
        const result = await pool.query(
            "UPDATE drivers SET is_available = $1 WHERE id = $2 RETURNING *",
            [is_available, id]
        )
        return result.rows[0]
    }
}