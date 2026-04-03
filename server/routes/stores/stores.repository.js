import { pool } from "../clients/supabase-db.js"

export class StoresRepository {
    
    getAllStores = async () => {
        const result = await pool.query("SELECT * FROM stores")
        return result.rows
    }

    getStoreById = async (id) => {
        const result = await pool.query(
            "SELECT * FROM stores WHERE id = $1", [id]
        )
        return result.rows[0]
    }

    updateStoreStatus = async (id, is_open) => {
        const result = await pool.query(
            "UPDATE stores SET is_open = $1 WHERE id = $2 RETURNING *",
            [is_open, id]
        )
        return result.rows[0]
    }

    createStore = async (name, address, category) => {
        const result = await pool.query(
            "INSERT INTO stores (name, address, category) VALUES ($1, $2, $3) RETURNING *",
            [name, address, category]
        )
        return result.rows[0]
    }
}