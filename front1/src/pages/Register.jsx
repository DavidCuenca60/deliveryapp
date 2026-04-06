import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "../supabase"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    })

    if (error) {
      setError("Error al registrarse, intenta de nuevo")
      setLoading(false)
      return
    }

    navigate("/home")
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-500">Delivery App</h1>
          <p className="text-gray-500 mt-2">Crea tu cuenta</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition mt-2"
          >
            {loading ? "Cargando..." : "Crear cuenta"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link to="/" className="text-blue-500 font-semibold">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register