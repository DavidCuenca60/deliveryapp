import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getOrderById, acceptOrder } from "../services/api"

function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const DRIVER_ID = 1

  useEffect(() => {
    getOrderById(id).then((data) => setOrder(data))
  }, [id])

  const handleAccept = async () => {
    setLoading(true)
    await acceptOrder(id, DRIVER_ID)
    setLoading(false)
    alert("¡Orden aceptada!")
    navigate("/accepted-orders")
  }

  if (!order) return <p className="p-6 text-gray-500">Cargando...</p>

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="bg-white  px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate("/orders")} className="text-purple-600 text-xl">←</button>
        <h1 className="text-xl font-bold text-gray-800">Detalle de orden</h1>
      </div>

      <div className="px-6 py-6 flex flex-col gap-4">
        <div className="bg-white  p-5 flex flex-col gap-3">
          <div>
            <p className="text-gray-400 text-xs">Orden #{order.id}</p>
            <p className="font-bold text-gray-800 text-lg mt-1">{order.address}</p>
          </div>
          <div className="border-t border-gray-100 pt-3">
            <p className="text-gray-500 text-sm">Método de pago: <span className="font-semibold text-gray-700">{order.payment_method}</span></p>
          </div>
          <div className="border-t border-gray-100 pt-3">
            <p className="text-gray-500 text-sm">Estado: <span className="font-semibold text-yellow-600">{order.status}</span></p>
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between">
            <p className="text-gray-500">Total</p>
            <p className="text-purple-600 font-bold text-xl">${Number(order.total).toLocaleString()}</p>
          </div>
        </div>

        <button
          onClick={handleAccept}
          disabled={loading || order.status !== "pending"}
          className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? "Aceptando..." : "Aceptar orden"}
        </button>
      </div>
    </div>
  )
}

export default OrderDetail