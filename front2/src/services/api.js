const API_URL = "http://localhost:8080"

export const getStoreById = async (id) => {
    const response = await fetch(`${API_URL}/stores/${id}`)
    return await response.json()
}

export const updateStoreStatus = async (id, is_open) => {
    const response = await fetch(`${API_URL}/stores/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_open })
    })
    return await response.json()
}

export const createProduct = async (product) => {
    const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    })
    return await response.json()
}

export const getOrders = async () => {
    const response = await fetch(`${API_URL}/orders`)
    const data = await response.json()
    return data.orders
}