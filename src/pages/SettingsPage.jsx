import { useState } from 'react'
import { Bell, Check, ChevronRight, CircleHelp, LockKeyhole, Mail, MapPin, ShieldCheck, Smartphone, UserRound } from 'lucide-react'
import PageHeader from '../components/shared/PageHeader'
import { useToast } from '../hooks/useToast'

const favoriteOptions = ['Burung', 'Ikan Hias', 'Bunga', 'Hewan Peliharaan']

function SettingToggle({ label, description, checked, onChange }) {
  return (
    <label className="settings-option">
      <span><strong>{label}</strong><small>{description}</small></span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
    </label>
  )
}

function FormField({ id, label, value, onChange, type = 'text', placeholder }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </div>
  )
}

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'Aulia Putri',
    username: '@auliaputri',
    email: 'aulia.putri@email.com',
    phone: '+62 812-3456-7890',
    location: 'Malang, Jawa Timur',
    bio: 'Pecinta tanaman hias dan pengunjung. Senang berbagi informasi dan cerita tentang Pasar Splendid.',
  })
  const [favorites, setFavorites] = useState(['Burung', 'Ikan Hias'])
  const [security, setSecurity] = useState({ currentPassword: '', newPassword: '', confirmPassword: '', twoStep: true })
  const [notifications, setNotifications] = useState({ replies: true, favorites: true, marketInfo: true, weeklyDigest: false, email: true, push: true })
  const [activeTab, setActiveTab] = useState('profile-settings')
  const showToast = useToast()

  const updateProfile = (key, value) => setProfile((current) => ({ ...current, [key]: value }))
  const updateSecurity = (key, value) => setSecurity((current) => ({ ...current, [key]: value }))
  const updateNotification = (key, value) => setNotifications((current) => ({ ...current, [key]: value }))
  const toggleFavorite = (value) => setFavorites((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value])
  const scrollToSection = (event, id) => {
    event.preventDefault()
    setActiveTab(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const saveSecurity = (event) => {
    event.preventDefault()
    if (security.newPassword && security.newPassword !== security.confirmPassword) {
      showToast('Konfirmasi password baru belum cocok.')
      return
    }
    showToast('Pengaturan keamanan berhasil disimpan.')
  }

  return (
    <div className="page-content settings-page">
      <PageHeader title="Pengaturan" section="AKUN & PREFERENSI" description="Kelola profil, keamanan, dan cara Anda menerima kabar dari Pasar Splendid." />

      <nav className="settings-tabs" aria-label="Bagian pengaturan">
        <a className={activeTab === 'profile-settings' ? 'is-active' : ''} href="#profile-settings" onClick={(event) => scrollToSection(event, 'profile-settings')}><UserRound size={12} /> Profil</a>
        <a className={activeTab === 'security-settings' ? 'is-active' : ''} href="#security-settings" onClick={(event) => scrollToSection(event, 'security-settings')}><ShieldCheck size={12} /> Keamanan</a>
        <a className={activeTab === 'notification-settings' ? 'is-active' : ''} href="#notification-settings" onClick={(event) => scrollToSection(event, 'notification-settings')}><Bell size={12} /> Notifikasi</a>
      </nav>

      <div className="settings-layout">
        <div className="settings-main-column">
          <section className="settings-card settings-profile-card" id="profile-settings">
            <div className="settings-card-heading">
              <span className="settings-section-icon"><UserRound size={15} /></span>
              <div><h2>Profil</h2><p>Informasi yang membantu komunitas mengenal Anda.</p></div>
            </div>

            <div className="settings-profile-toolbar">
              <div className="profile-summary">
                <span className="avatar avatar-profile">AP</span>
                <span><strong>{profile.name}</strong><small>Admin Komunitas · Aktif sejak 2022</small></span>
              </div>
              <button className="settings-upload-button" type="button" onClick={() => showToast('Foto profil siap diperbarui.')}><UserRound size={11} /> Ubah foto</button>
            </div>

            <form className="settings-profile-form" onSubmit={(event) => { event.preventDefault(); showToast('Profil berhasil disimpan.') }}>
              <FormField id="profile-name" label="Nama lengkap" value={profile.name} onChange={(value) => updateProfile('name', value)} />
              <FormField id="profile-username" label="Nama pengguna" value={profile.username} onChange={(value) => updateProfile('username', value)} />
              <FormField id="profile-email" label="Email" type="email" value={profile.email} onChange={(value) => updateProfile('email', value)} />
              <FormField id="profile-phone" label="Nomor telepon" value={profile.phone} onChange={(value) => updateProfile('phone', value)} />
              <FormField id="profile-city" label="Kota" value={profile.location} onChange={(value) => updateProfile('location', value)} />
              <div className="form-field settings-bio-field"><label htmlFor="profile-bio">Bio singkat</label><textarea id="profile-bio" value={profile.bio} onChange={(event) => updateProfile('bio', event.target.value)} rows="2" /></div>

              <fieldset className="favorite-sectors">
                <legend>Sektor favorit</legend>
                <div>{favoriteOptions.map((sector) => <button key={sector} type="button" aria-pressed={favorites.includes(sector)} className={favorites.includes(sector) ? 'favorite-chip is-selected' : 'favorite-chip'} onClick={() => toggleFavorite(sector)}>{favorites.includes(sector) && <Check size={9} />}{sector}</button>)}</div>
              </fieldset>
              <button className="button-small-primary save-button" type="submit"><Check size={12} /> Simpan profil</button>
            </form>
          </section>

          <section className="settings-card settings-security-card" id="security-settings">
            <div className="settings-card-heading">
              <span className="settings-section-icon security-icon"><ShieldCheck size={15} /></span>
              <div><h2>Keamanan</h2><p>Lindungi akun dan perangkat yang Anda gunakan.</p></div>
            </div>

            <form className="settings-security-form" onSubmit={saveSecurity}>
              <div className="form-field settings-password-current"><label htmlFor="current-password">Password saat ini</label><div className="settings-input-with-icon"><LockKeyhole size={11} /><input id="current-password" type="password" autoComplete="current-password" placeholder="••••••••••••" value={security.currentPassword} onChange={(event) => updateSecurity('currentPassword', event.target.value)} /></div></div>
              <FormField id="new-password" label="Password baru" type="password" placeholder="Masukkan password baru" value={security.newPassword} onChange={(value) => updateSecurity('newPassword', value)} />
              <FormField id="confirm-password" label="Konfirmasi password baru" type="password" placeholder="Ulangi password baru" value={security.confirmPassword} onChange={(value) => updateSecurity('confirmPassword', value)} />
              <p className="password-hint">Gunakan kombinasi minimal 8 karakter, termasuk huruf dan angka.</p>

              <div className="security-two-step">
                <span><strong>Verifikasi dua langkah</strong><small>Tambahkan lapisan keamanan pada akun Anda.</small></span>
                <input aria-label="Aktifkan verifikasi dua langkah" type="checkbox" checked={security.twoStep} onChange={(event) => updateSecurity('twoStep', event.target.checked)} />
              </div>
              <div className="settings-connected-service"><span className="connected-service-icon">G</span><span><strong>Chrome · Windows</strong><small>Terhubung dengan Google · terakhir aktif hari ini</small></span><b>Aktif</b></div>
              <button className="button-small-primary save-button" type="submit"><LockKeyhole size={12} /> Simpan keamanan</button>
            </form>
          </section>

          <section className="settings-card settings-notifications-card" id="notification-settings">
            <div className="settings-card-heading">
              <span className="settings-section-icon notification-settings-icon"><Bell size={14} /></span>
              <div><h2>Notifikasi</h2><p>Pilih kabar yang ingin Anda terima dari Pasar Splendid.</p></div>
            </div>
            <div className="settings-option-list">
              <SettingToggle label="Balasan diskusi" description="Beri tahu saya saat seseorang membalas diskusi saya." checked={notifications.replies} onChange={(value) => updateNotification('replies', value)} />
              <SettingToggle label="Diskusi favorit" description="Dapatkan kabar terbaru dari diskusi yang Anda ikuti." checked={notifications.favorites} onChange={(value) => updateNotification('favorites', value)} />
              <SettingToggle label="Info & pengumuman pasar" description="Kabar operasional, kegiatan, dan informasi penting." checked={notifications.marketInfo} onChange={(value) => updateNotification('marketInfo', value)} />
              <SettingToggle label="Ringkasan mingguan" description="Rangkuman percakapan komunitas setiap pekan." checked={notifications.weeklyDigest} onChange={(value) => updateNotification('weeklyDigest', value)} />
            </div>
            <fieldset className="notification-channels">
              <legend>Kirim melalui</legend>
              <label><input type="checkbox" checked={notifications.email} onChange={(event) => updateNotification('email', event.target.checked)} /><Mail size={11} /> Email</label>
              <label><input type="checkbox" checked={notifications.push} onChange={(event) => updateNotification('push', event.target.checked)} /><Smartphone size={11} /> Push notification</label>
            </fieldset>
            <button className="button-small-primary save-button" type="button" onClick={() => showToast('Preferensi notifikasi berhasil disimpan.')}><Bell size={12} /> Simpan notifikasi</button>
          </section>
        </div>

        <aside className="settings-side-column">
          <section className="settings-account-card settings-account-summary">
            <span className="settings-account-avatar">AP</span>
            <h2>{profile.name}</h2>
            <span className="settings-account-role">Admin Komunitas</span>
            <p>Member sejak Mei 2022</p>
            <div className="account-detail"><span>Status akun</span><strong><i /> Aktif</strong></div>
            <div className="account-detail"><span>Lokasi</span><strong><MapPin size={10} /> Malang, Jawa Timur</strong></div>
          </section>

          <section className="settings-help-card settings-privacy-card">
            <span className="settings-help-icon"><ShieldCheck size={14} /></span>
            <h3>Pengaturan privasi</h3>
            <p>Profil, komentar, dan aktivitas komunitas Anda dapat dilihat oleh anggota Pasar Splendid.</p>
            <button className="text-button" type="button" onClick={() => showToast('Preferensi privasi akun Anda sudah terbuka.')}><CircleHelp size={10} /> Kelola preferensi <ChevronRight size={10} /></button>
          </section>

          <div className="settings-tip"><span><ShieldCheck size={13} /></span><p><strong>Privasi tetap terjaga</strong><br />Kami menjaga informasi Anda dan hanya membagikannya sesuai preferensi akun.</p></div>
        </aside>
      </div>
      <footer className="page-footer"><span>Pasar Splendid Malang · Ruang tumbuh untuk pasar dan komunitas.</span><span>Preferensi Anda tersimpan dengan aman</span></footer>
    </div>
  )
}
