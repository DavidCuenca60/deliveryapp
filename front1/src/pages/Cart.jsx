import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { createOrder } from "../services/api"
import { supabase } from "../supabase"

function Cart() {
  const navigate = useNavigate()
  const location = useLocation()
  const { cart, storeId } = location.state || { cart: [], storeId: null }
  const [address, setAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("tarjeta")
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id)
    })
  }, [])

  const getTotal = () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleOrder = async () => {
    if (!address) {
      alert("Por favor ingresa una dirección")
      return
    }
    setLoading(true)
    await createOrder({
      user_id: userId,
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
    <div className="min-h-screen bg-white-50">

      
      <div className="bg-white px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-blue-500 text-xl">←</button>
        <h1 className="text-xl font-bold text-gray-800">Tu carrito</h1>
      </div>

      <div className="px-6 py-6 flex flex-col gap-4">

        
        {cart.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-800">{item.name}</h3>
              <p className="text-gray-500 text-sm">Cantidad: {item.quantity}</p>
            </div>
            <p className="text-blue-500 font-semibold">
              ${(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}

        
        <div className="bg-white  shadow p-4 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Total</h3>
          <p className="text-blue-500 font-bold text-xl">${getTotal().toLocaleString()}</p>
        </div>

        
        <div className="bg-white shadow p-3">
          <label className="text-sm font-medium text-gray-700">Dirección de entrega</label>
          <input
            type="text"
            placeholder="Ej: Calle 10 #45-20, Cali"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full mt-2 px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-400"
          />
        </div>

        
        <div className="bg-white shadow p-4">
          <label className="text-sm font-medium text-gray-700">Método de pago</label>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => setPaymentMethod("tarjeta")}
              className={`flex-1 py-2  font-semibold border transition ${paymentMethod === "tarjeta" ? "bg-blue-500 text-white" : "bg-white text-gray-600"}`}
            >
              Tarjeta
            </button>
            <button
              onClick={() => setPaymentMethod("efectivo")}
              className={`flex-1 py-2 font-semibold border transition ${paymentMethod === "efectivo" ? "bg-blue-500 text-white" : "bg-white text-gray-600"}`}
            >
              Efectivo
            </button>
          </div>
        </div>

        
        <button
          onClick={handleOrder}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-4 font-bold hover:bg-blue-600 transition"
        >
          {loading ? "Creando orden..." : "Hacer pedido"}
        </button>

      </div>
    </div>
  )
}

export default Cart