import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Store } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../hooks/useToast'

export default function LoginPage() {
  const [email, setEmail] = useState('aulia.putri@email.com')
  const [password, setPassword] = useState('pasarsplendid')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const navigate = useNavigate()
  const showToast = useToast()

  const submitLogin = (event) => {
    event.preventDefault()
    navigate('/admin/dashboard')
    showToast('Selamat datang kembali, Aulia!')
  }

  return (
    <main className="login-shell">
      <div className="login-topline"><Link className="brand login-brand" to="/admin/dashboard"><span className="brand-mark"><Store size={18} /></span><span className="brand-copy"><strong>Pasar Splendid</strong><small>MALANG • SEJAK 1960</small></span></Link><span>Pasar lokal. Cerita yang menghubungkan.</span></div>
      <section className="login-card">
        <div className="login-story">
          <span className="login-location">◉ &nbsp;MALANG, JAWA TIMUR</span>
          <div className="login-story-copy"><h1>Temukan kehidupan.<br />Tumbuhkan koneksi.</h1><p>Jelajahi kekayaan Pasar Splendid, temui pedagang lokal, dan berbagi cerita bersama komunitas.</p><div className="community-proof"><strong>340+</strong><span>Anggota berbagi inspirasi<br />setiap hari</span></div></div>
        </div>
        <div className="login-form-panel">
          <div className="login-form-brand"><span className="brand-mark"><Store size={16} /></span><span><strong>Pasar Splendid</strong><small>MALANG • SEJAK 1960</small></span></div>
          <h2>Selamat datang kembali</h2><p className="login-subtitle">Masuk untuk menjelajahi pasar dan terhubung dengan komunitas Splendid.</p>
          <form className="login-form" onSubmit={submitLogin}>
            <label htmlFor="login-email">Email</label>
            <div className="login-input"><Mail size={14} /><input id="login-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></div>
            <label htmlFor="login-password">Password</label>
            <div className="login-input"><LockKeyhole size={14} /><input id="login-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /><button type="button" className="reveal-password" aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff size={14} /> : <Eye size={14} />}</button></div>
            <div className="login-options"><label className="remember-option"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /> Ingat saya</label><button type="button" className="text-button" onClick={() => showToast('Tautan pemulihan akan dikirim ke email Anda.')}>Lupa password?</button></div>
            <button className="login-submit" type="submit">Masuk <ArrowRight size={14} /></button>
          </form>
          <p className="signup-prompt">Belum punya akun? <button className="text-button" type="button" onClick={() => showToast('Pendaftaran akun akan segera tersedia.')}>Daftar sekarang</button></p>
          <p className="login-security"><ShieldCheck size={14} /> Data Anda aman. Bersama membangun pasar yang lebih terhubung.</p>
        </div>
      </section>
      <footer className="login-footer"><span>© 2026 Pasar Splendid Malang</span><span><button onClick={() => showToast('Kebijakan Privasi Pasar Splendid.')}>Kebijakan Privasi</button><i /> <button onClick={() => showToast('Syarat & Ketentuan Pasar Splendid.')}>Syarat & Ketentuan</button></span></footer>
    </main>
  )
}
