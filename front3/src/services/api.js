const API_URL = "http://localhost:8080"

export const getOrders = async () => {
    const response = await fetch(`${API_URL}/orders`)
    const data = await response.json()
    return data.orders
}

export const getOrderById = async (id) => {
    const response = await fetch(`${API_URL}/orders/${id}`)
    return await response.json()
}

export const acceptOrder = async (id, driver_id) => {
    const response = await fetch(`${API_URL}/orders/${id}/accept`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driver_id })
    })
    return await response.json()
}