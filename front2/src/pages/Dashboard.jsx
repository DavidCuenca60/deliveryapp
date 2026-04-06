import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getStoreById, updateStoreStatus, getOrders } from "../services/api"
import { supabase } from "../supabase"

function Dashboard() {
  const navigate = useNavigate()
  const [store, setStore] = useState(null)
  const [orders, setOrders] = useState([])
  const STORE_ID = 1

  useEffect(() => {
    getStoreById(STORE_ID).then((data) => setStore(data))
    getOrders().then((data) => setOrders(data))
  }, [])

  const toggleStatus = async () => {
    const updated = await updateStoreStatus(STORE_ID, !store.is_open)
    setStore(updated)
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="bg-white px-10 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-green-600">Mi Tienda</h1>
            <div className="flex gap-4">
        <button
        onClick={() => navigate("/create-product")}
        className="bg-green-600 text-white px-4 py-2  text-sm font-semibold hover:bg-green-700 transition"
        >
        + Producto
        </button>
        <button
            onClick={async () => {
            await supabase.auth.signOut()
            navigate("/")
        }}
        className="text-sm font-semibold hover:underline"
        >
        Salir
        </button>
        </div>
    </div>

      <div className="px-6 py-6 flex flex-col gap-4">

    
        {store && (
          <div className="bg-white  p-5">
            <h2 className="text-xl font-bold text-gray-800">{store.name}</h2>
            <p className="text-gray-500 text-sm">{store.category}</p>
            <p className="text-gray-400 text-xs mt-1">{store.address}</p>
            <div className="flex justify-between items-center mt-4">
              <span className={`text-sm font-semibold px-3 py-1 ${store.is_open ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                {store.is_open ? "Abierta" : "Cerrada"}
              </span>
              <button
                onClick={toggleStatus}
                className={`px-2 py-1 text-sm font-semibold text-white transition ${store.is_open ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
              >
                {store.is_open ? "Cerrar tienda" : "Abrir tienda"}
              </button>
            </div>
          </div>
        )}

        
        <h2 className="text-lg font-bold text-gray-800 mt-2"> Pedidos recibidos</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">No hay pedidos aún</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-xs">Orden #{order.id}</p>
                  <p className="font-bold text-gray-800 mt-1">{order.address}</p>
                  <p className="text-gray-500 text-sm">{order.payment_method}</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 text-yellow-600">
                  {order.status}
                </span>
              </div>
              <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between">
                <p className="text-gray-500 text-sm">Total</p>
                <p className="text-green-600 font-bold">${Number(order.total).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard