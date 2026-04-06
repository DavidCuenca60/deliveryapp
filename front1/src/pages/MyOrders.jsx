import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getOrders } from "../services/api"
import { supabase } from "../supabase"

function MyOrders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const userId = data.user?.id
      getOrders().then((allOrders) => {
        const myOrders = allOrders.filter((o) => o.user_id === userId)
        setOrders(myOrders)
        setLoading(false)
      })
    })
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-600"
      case "preparing": return "bg-blue-100 text-blue-600"
      case "on_way": return "bg-purple-100 text-purple-600"
      case "delivered": return "bg-green-100 text-green-600"
      default: return "bg-gray-100 text-gray-600"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending": return "⏳ Pendiente"
      case "preparing": return "👨‍🍳 Preparando"
      case "on_way": return "🛵 En camino"
      case "delivered": return "✅ Entregado"
      default: return status
    }
  }

  return (
    <div className="min-h-screen bg-blue-50">

      
      <div className="bg-white px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate("/home")} className="text-xl">←</button>
        <h1 className="text-xl font-bold text-gray-800">Mis órdenes</h1>
      </div>

      <div className="px-6 py-6 flex flex-col gap-4">
        {loading ? (
          <p className="text-gray-500">Cargando órdenes...</p>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🛒</p>
            <p className="text-gray-500 font-medium">No tienes órdenes aún</p>
            <button
              onClick={() => navigate("/home")}
              className="mt-4 bg-blue-500 text-white px-6 py-3 font-semibold hover:bg-blue-600 transition"
            >
              Hacer un pedido
            </button>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white  shadow p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-xs">Orden #{order.id}</p>
                  <p className="font-bold text-gray-800 mt-1"> {order.address}</p>
                  <p className="text-gray-500 text-sm mt-1"> {order.payment_method}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>
              <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between">
                <p className="text-gray-500 text-sm">Total</p>
                <p className="text-blue-500 font-bold">${Number(order.total).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default MyOrders