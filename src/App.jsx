import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './components/layout/AdminLayout'
import { ToastProvider } from './context/ToastContext'
import DashboardPage from './pages/DashboardPage'
import MarketMapPage from './pages/MarketMapPage'
import MarketCategoryPage from './pages/MarketCategoryPage'
import ForumPage from './pages/ForumPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import './App.css'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate replace to="/admin/dashboard" />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="pasar/:slug" element={<MarketCategoryPage />} />
        <Route path="forum" element={<ForumPage />} />
        <Route path="peta-lokasi" element={<MarketMapPage />} />
        <Route path="pengaturan" element={<SettingsPage />} />
        <Route path="tenant" element={<Navigate replace to="/admin/pasar/burung" />} />
        <Route path="booth" element={<Navigate replace to="/admin/peta-lokasi" />} />
        <Route path="transaksi" element={<Navigate replace to="/admin/dashboard" />} />
        <Route path="laporan" element={<Navigate replace to="/admin/dashboard" />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/admin/dashboard" />} />
    </Routes>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ToastProvider>
  )
}
