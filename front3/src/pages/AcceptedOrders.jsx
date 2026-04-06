import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getOrders } from "../services/api"

function AcceptedOrders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOrders().then((data) => {
      const accepted = data.filter((o) => o.status === "on_way")
      setOrders(accepted)
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="bg-white  px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate("/orders")} className="text-green-600 text-xl">←</button>
        <h1 className="text-xl font-bold text-gray-800">Órdenes aceptadas</h1>
      </div>

      <div className="px-6 py-6 flex flex-col gap-4">
        {loading ? (
          <p className="text-gray-500">Cargando...</p>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">📭</p>
            <p className="text-gray-500 font-medium">No tienes órdenes aceptadas</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-xs">Orden #{order.id}</p>
                  <p className="font-bold text-gray-800 mt-1">{order.address}</p>
                  <p className="text-gray-500 text-sm mt-1">{order.payment_method}</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full text-purple-600">
                  En camino
                </span>
              </div>
              <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between">
                <p className="text-gray-500 text-sm">Total</p>
                <p className="text-purple-600 font-bold">${Number(order.total).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AcceptedOrders