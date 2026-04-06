import { supabase } from "../supabase"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getStores } from "../services/api"

function Home() {
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getStores().then((data) => {
      setStores(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen bg-blue-50">
      
      
      <div className="bg-white  px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Delivery App</h1>
        <div className="flex gap-4">
            <button
            onClick={() => navigate("/cart", { state: { cart: [], storeId: null } })}
            className="text-sm font-semibold hover:underline"
            >
                Carrito
            </button>
            <button
            onClick={() => navigate("/my-orders")}
            className="text-sm font-semibold hover:underline"
            >
                Mis órdenes
            </button>
            <button
                onClick={async () => {
                    await supabase.auth.signOut()
                    navigate("/")
                }}
                className="text-sm  font-semibold hover:underline"
            >
                Salir
            </button>
        </div>
      </div>

      
      <div className="px-6 py-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Tiendas disponibles</h2>

        {loading ? (
          <p className="text-gray-500">Cargando tiendas...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {stores.map((store) => (
              <div
                key={store.id}
                onClick={() => navigate(`/store/${store.id}`)}
                className="bg-white  p-5 flex justify-between items-center cursor-pointer "
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{store.name}</h3>
                  <p className="text-gray-500 text-sm">{store.category}</p>
                  <p className="text-gray-400 text-xs mt-1">{store.address}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${store.is_open ? " text-violet-600" : " text-red-500"}`}>
                    {store.is_open ? "Abierto" : "Cerrado"}
                  </span>
                  <span className="text-blue-400 text-xl">→</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Home