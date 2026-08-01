import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout'
import AdminLogin from './pages/auth/AdminLogin'
import SellerLogin from './pages/auth/SellerLogin'
import SellerRegister from './pages/auth/SellerRegister'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Sellers from './pages/Sellers'
import Customers from './pages/Customers'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/admin/login"     element={<AdminLogin />} />
        <Route path="/seller/login"    element={<SellerLogin />} />
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route path="/auth/register"   element={<SellerRegister />} />
        <Route path="/auth/login"      element={<SellerLogin />} />
        <Route path="/register"        element={<SellerRegister />} />
        <Route path="/login"           element={<SellerLogin />} />

        {/* Dashboard Routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard"  element={<Dashboard />} />
          <Route path="products"   element={<Products />} />
          <Route path="orders"     element={<Orders />} />
          <Route path="sellers"    element={<Sellers />} />
          <Route path="customers"  element={<Customers />} />
          <Route path="analytics"  element={<Analytics />} />
          <Route path="settings"   element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
