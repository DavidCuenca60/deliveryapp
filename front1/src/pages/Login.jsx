import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "../supabase"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError("Email o contraseña incorrectos")
      setLoading(false)
      return
    }

    navigate("/home")
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8  w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text500">Delivery App</h1>
          <p className="text-gray-500 mt-2">Inicia sesión</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-x1 mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-blue-500 font-semibold">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login