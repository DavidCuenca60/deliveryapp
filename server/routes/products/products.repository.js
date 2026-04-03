import { pool } from "../clients/supabase-db.js"

export class ProductsRepository {

    getAllProducts = async () => {
        const result = await pool.query("SELECT * FROM products")
        return result.rows
    }

    getProductById = async (id) => {
        const result = await pool.query(
            "SELECT * FROM products WHERE id = $1", [id]
        )
        return result.rows[0]
    }

    getProductsByStore = async (store_id) => {
        const result = await pool.query(
            "SELECT * FROM products WHERE store_id = $1", [store_id]
        )
        return result.rows
    }

    createProduct = async (store_id, name, description, price) => {
        const result = await pool.query(
            "INSERT INTO products (store_id, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *",
            [store_id, name, description, price]
        )
        return result.rows[0]
    }

    updateProduct = async (id, name, description, price, available) => {
        const result = await pool.query(
            "UPDATE products SET name=$1, description=$2, price=$3, available=$4 WHERE id=$5 RETURNING *",
            [name, description, price, available, id]
        )
        return result.rows[0]
    }
}