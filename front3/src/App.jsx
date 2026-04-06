import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Orders from "./pages/Orders"
import OrderDetail from "./pages/OrderDetail"
import AcceptedOrders from "./pages/AcceptedOrders"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/accepted-orders" element={<AcceptedOrders />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App