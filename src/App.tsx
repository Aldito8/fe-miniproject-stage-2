import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Home } from './pages/Home'
import { NavBar } from './components/layout/Navbar'
import { Product } from './pages/Product'
import { UserOrder } from './pages/UserOrder'
import { Profile } from './pages/Profile'
import { AdminProduct } from './pages/AdminProduct'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { AdminRoute } from './routes/AdminRoute'
import { AdminAddProduct } from './pages/AdminAddProduct'
import { AuthProvider } from './context/AuthProvider'
import { AdminNextProduct } from './pages/AdminNextProduct'
import { UserTransfer } from './pages/UserTransfer'
import { AllUserOrder } from './pages/UserAllOrder'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/products' element={<Product />} />

          <Route path='/myorder' element={
            <ProtectedRoute>
              <UserOrder />
            </ProtectedRoute>
          } />

          <Route path='/myprofile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          <Route path='/transaction' element={
            <ProtectedRoute>
              <UserTransfer />
            </ProtectedRoute>
          } />

          <Route path='/admin-product' element={
            <AdminRoute>
              <AdminProduct />
            </AdminRoute>
          } />

          <Route path='/add-product' element={
            <AdminRoute>
              <AdminAddProduct />
            </AdminRoute>
          } />

          <Route path='/restore-product' element={
            <AdminRoute>
              <AdminNextProduct />
            </AdminRoute>
          } />

          <Route path='/all-order' element={
            <AdminRoute>
              <AllUserOrder />
            </AdminRoute>
          } />

        </Routes>
      </BrowserRouter>
    </AuthProvider>


  )
}

export default App
