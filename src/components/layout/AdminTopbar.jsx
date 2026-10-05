import { useState } from 'react'
import { Bell, ChevronDown, Search, Store } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../hooks/useToast'

export default function AdminTopbar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const showToast = useToast()

  const handleSearch = (event) => {
    event.preventDefault()
    const value = query.trim().toLocaleLowerCase('id')
    if (!value) return
    const matches = [
      ['burung', '/admin/pasar/burung'],
      ['ikan', '/admin/pasar/ikan-hias'],
      ['bunga', '/admin/pasar/bunga'],
      ['hewan', '/admin/pasar/hewan-peliharaan'],
      ['diskusi', '/admin/forum'],
      ['peta', '/admin/peta-lokasi'],
    ]
    const match = matches.find(([term]) => value.includes(term))
    if (match) navigate(match[1])
    else showToast(`Belum ada hasil untuk “${query.trim()}”.`)
    setQuery('')
  }

  return (
    <header className="topbar">
      <form className="global-search" onSubmit={handleSearch} role="search">
        <Search size={15} />
        <input aria-label="Cari kios, kategori, atau diskusi" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari kios, kategori, atau diskusi..." />
      </form>
      <div className="topbar-actions">
        <button className="icon-button notification-button" type="button" aria-label="Notifikasi" onClick={() => showToast('Tidak ada notifikasi baru.')}><Bell size={16} /><i /></button>
        <button className="contact-admin" type="button" onClick={() => showToast('Tim admin siap membantu Anda melalui pusat bantuan.')}><Store size={12} /> Ada Pertanyaan? Hubungi Admin</button>
        <button className="profile-button" type="button" onClick={() => showToast('Aulia Putri · Admin Komunitas')} aria-label="Profil Aulia Putri"><span className="avatar avatar-top">AP</span><ChevronDown size={12} /></button>
      </div>
    </header>
  )
}
