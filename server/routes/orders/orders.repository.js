import { pool } from "../clients/supabase-db.js"

export class OrdersRepository {

    getAllOrders = async () => {
        const result = await pool.query("SELECT * FROM orders")
        return result.rows
    }

    getOrderById = async (id) => {
        const result = await pool.query(
            "SELECT * FROM orders WHERE id = $1", [id]
        )
        return result.rows[0]
    }

    createOrder = async (user_id, store_id, total, address, payment_method) => {
        const result = await pool.query(
            "INSERT INTO orders (user_id, store_id, total, address, payment_method, status) VALUES ($1, $2, $3, $4, $5, 'pending') RETURNING *",
            [user_id, store_id, total, address, payment_method]
        )
        return result.rows[0]
    }

    acceptOrder = async (id, driver_id) => {
        const result = await pool.query(
            "UPDATE orders SET status = 'on_way', driver_id = $1 WHERE id = $2 RETURNING *",
            [driver_id, id]
        )
        return result.rows[0]
    }
}