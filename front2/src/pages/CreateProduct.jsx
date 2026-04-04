import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createProduct } from "../services/api"

function CreateProduct() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [loading, setLoading] = useState(false)
  const STORE_ID = 1

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await createProduct({
      store_id: STORE_ID,
      name,
      description,
      price: Number(price)
    })
    setLoading(false)
    alert("¡Producto creado exitosamente!")
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="bg-white shadow-sm px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate("/dashboard")} className="text-blue-600 text-xl">←</button>
        <h1 className="text-xl font-bold text-gray-800">➕ Crear producto</h1>
      </div>

      <div className="px-6 py-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow p-5 flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                placeholder="Ej: Hamburguesa Especial"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                placeholder="Ej: Carne 200g, queso, lechuga..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Precio</label>
              <input
                type="number"
                placeholder="Ej: 18000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition"
          >
            {loading ? "Creando..." : "Crear producto"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct