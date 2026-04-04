import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { createOrder } from "../services/api"

function Cart() {
  const navigate = useNavigate()
  const location = useLocation()
  const { cart, storeId } = location.state || { cart: [], storeId: null }
  const [address, setAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("tarjeta")
  const [loading, setLoading] = useState(false)

  const getTotal = () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleOrder = async () => {
    if (!address) {
      alert("Por favor ingresa una dirección")
      return
    }
    setLoading(true)
    await createOrder({
      user_id: "user-001",
      store_id: Number(storeId),
      total: getTotal(),
      address,
      payment_method: paymentMethod
    })
    setLoading(false)
    alert("¡Orden creada exitosamente!")
    navigate("/my-orders")
  }

  return (
    <div className="min-h-screen bg-orange-50">

      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-orange-500 text-xl">←</button>
        <h1 className="text-xl font-bold text-gray-800">🛒 Tu carrito</h1>
      </div>

      <div className="px-6 py-6 flex flex-col gap-4">

        {/* Productos */}
        {cart.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-800">{item.name}</h3>
              <p className="text-gray-500 text-sm">Cantidad: {item.quantity}</p>
            </div>
            <p className="text-orange-500 font-semibold">
              ${(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}

        {/* Total */}
        <div className="bg-white rounded-2xl shadow p-4 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Total</h3>
          <p className="text-orange-500 font-bold text-xl">${getTotal().toLocaleString()}</p>
        </div>

        {/* Dirección */}
        <div className="bg-white rounded-2xl shadow p-4">
          <label className="text-sm font-medium text-gray-700">📍 Dirección de entrega</label>
          <input
            type="text"
            placeholder="Ej: Calle 10 #45-20, Cali"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400"
          />
        </div>

        {/* Método de pago */}
        <div className="bg-white rounded-2xl shadow p-4">
          <label className="text-sm font-medium text-gray-700">💳 Método de pago</label>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => setPaymentMethod("tarjeta")}
              className={`flex-1 py-2 rounded-xl font-semibold border transition ${paymentMethod === "tarjeta" ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-300"}`}
            >
              Tarjeta
            </button>
            <button
              onClick={() => setPaymentMethod("efectivo")}
              className={`flex-1 py-2 rounded-xl font-semibold border transition ${paymentMethod === "efectivo" ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-300"}`}
            >
              Efectivo
            </button>
          </div>
        </div>

        {/* Botón ordenar */}
        <button
          onClick={handleOrder}
          disabled={loading}
          className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition"
        >
          {loading ? "Creando orden..." : "Hacer pedido"}
        </button>

      </div>
    </div>
  )
}

export default Cart