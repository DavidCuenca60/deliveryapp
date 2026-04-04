import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getStoreById, getProducts } from "../services/api"

function StoreDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [store, setStore] = useState(null)
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    getStoreById(id).then((data) => setStore(data))
    getProducts().then((data) => {
      const filtered = data.filter((p) => p.store_id === Number(id))
      setProducts(filtered)
    })
  }, [id])

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id)
    if (exists) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const getTotal = () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-orange-50">

      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate("/home")} className="text-orange-500 text-xl">←</button>
        <h1 className="text-xl font-bold text-gray-800">{store?.name}</h1>
      </div>

      {/* Productos */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">🍽️ Menú</h2>
        <div className="flex flex-col gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-800">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.description}</p>
                <p className="text-orange-500 font-semibold mt-1">${product.price.toLocaleString()}</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-orange-600 transition"
              >
                + Agregar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Carrito flotante */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-0 right-0 px-6">
          <button
            onClick={() => navigate("/cart", { state: { cart, storeId: id } })}
            className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-orange-600 transition flex justify-between px-6"
          >
            <span>🛒 Ver carrito ({cart.length})</span>
            <span>${getTotal().toLocaleString()}</span>
          </button>
        </div>
      )}

    </div>
  )
}

export default StoreDetail