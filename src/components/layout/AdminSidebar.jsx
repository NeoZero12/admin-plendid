import { NavLink } from 'react-router-dom'
import {
  Bird,
  Flower2,
  House,
  LogOut,
  Map,
  MessageCircle,
  PawPrint,
  Settings,
  Shell,
  Store,
} from 'lucide-react'
import { useToast } from '../../hooks/useToast'

const marketLinks = [
  { label: 'Dashboard', icon: House, to: '/admin/dashboard' },
  { label: 'Pasar Burung', icon: Bird, to: '/admin/pasar/burung' },
  { label: 'Pasar Ikan Hias', icon: Shell, to: '/admin/pasar/ikan-hias' },
  { label: 'Pasar Bunga', icon: Flower2, to: '/admin/pasar/bunga' },
  { label: 'Hewan Peliharaan', icon: PawPrint, to: '/admin/pasar/hewan-peliharaan' },
  { label: 'Forum Komunitas', icon: MessageCircle, to: '/admin/forum' },
  { label: 'Peta Lokasi Pasar', icon: Map, to: '/admin/peta-lokasi' },
]

export default function AdminSidebar() {
  const showToast = useToast()

  return (
    <aside className="sidebar">
      <NavLink className="brand" to="/admin/dashboard" aria-label="Pasar Splendid, Dashboard">
        <span className="brand-mark"><Store size={18} strokeWidth={2.5} /></span>
        <span className="brand-copy"><strong>Pasar Splendid</strong><small>MALANG • SEJAK 1960</small></span>
      </NavLink>
      <p className="sidebar-label">JELAJAH PASAR</p>
      <nav className="side-nav" aria-label="Navigasi pasar">
        {marketLinks.map(({ label, icon: Icon, to }) => (
          <NavLink className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`} end to={to} key={to} title={label}>
            <Icon size={15} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="open-market-card" type="button" onClick={() => showToast('Pasar Splendid buka setiap hari pukul 07.00–17.00 WIB.')}>
          <span className="open-dot" />
          <span><strong>Pasar buka hari ini</strong><small>Setiap hari, 07:00–17:00 WIB</small><small>Jl. Arjuno, Kota Malang</small></span>
        </button>
        <NavLink className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`} to="/admin/pengaturan" title="Pengaturan">
          <Settings size={15} strokeWidth={1.8} /><span>Pengaturan</span>
        </NavLink>
        <div className="sidebar-user">
          <span className="avatar avatar-sidebar">AP</span>
          <div className="user-copy"><strong>Aulia Putri</strong><small>Admin Komunitas</small></div>
          <button className="icon-button sidebar-logout" type="button" aria-label="Keluar" onClick={() => showToast('Sesi demo tetap aktif.')}><LogOut size={14} /></button>
        </div>
      </div>
    </aside>
  )
}
