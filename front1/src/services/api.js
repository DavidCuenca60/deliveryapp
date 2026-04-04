const API_URL = "http://localhost:8080"

export const getStores = async () => {
    const response = await fetch(`${API_URL}/stores`)
    const data = await response.json()
    return data.stores
}

export const getStoreById = async (id) => {
    const response = await fetch(`${API_URL}/stores/${id}`)
    const data = await response.json()
    return data
}

export const getProducts = async () => {
    const response = await fetch(`${API_URL}/products`)
    const data = await response.json()
    return data.products
}

export const createOrder = async (order) => {
    const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
    })
    const data = await response.json()
    return data
}

export const getOrders = async () => {
    const response = await fetch(`${API_URL}/orders`)
    const data = await response.json()
    return data.orders
}