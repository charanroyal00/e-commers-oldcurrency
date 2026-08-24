import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import DashboardLayout from './components/layout/DashboardLayout'
import AdminLogin from './pages/auth/AdminLogin'
import SellerLogin from './pages/auth/SellerLogin'
import SellerRegister from './pages/auth/SellerRegister'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import AddProduct from './pages/products/AddProduct'
import EditProduct from './pages/products/EditProduct'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import Sellers from './pages/Sellers'
import Customers from './pages/Customers'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import ReviewModeration from './pages/ReviewModeration'
import Reports from './pages/Reports'
import CategoryManagement from './pages/CategoryManagement'
import InventoryManagement from './pages/InventoryManagement'
import SellerInventory from './pages/SellerInventory'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/admin/login"      element={<AdminLogin />} />
          <Route path="/seller/login"     element={<SellerLogin />} />
          <Route path="/seller/register"  element={<SellerRegister />} />

          {/* Dashboard Routes */}
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard"        element={<Dashboard />} />
            <Route path="products"         element={<Products />} />
            <Route path="products/add"     element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="orders"           element={<Orders />} />
            <Route path="orders/:id"       element={<OrderDetail />} />
            <Route path="sellers"          element={<Sellers />} />
            <Route path="customers"        element={<Customers />} />
            <Route path="reviews"          element={<ReviewModeration />} />
            <Route path="reports"          element={<Reports />} />
            <Route path="analytics"        element={<Analytics />} />
            <Route path="settings"         element={<Settings />} />
            <Route path="categories"       element={<CategoryManagement />} />
            <Route path="inventory"        element={<InventoryManagement />} />
            <Route path="seller-inventory" element={<SellerInventory />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
