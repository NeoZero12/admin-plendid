import { ArrowRight, ArrowUpRight, Clock3, Flower2, MapPin, MessageCircle, Shell, Store, Users, Bird, PawPrint } from 'lucide-react'
import { Link } from 'react-router-dom'
import MarketPlan from '../components/map/MarketPlan'
import { marketCatalog } from '../data/marketCatalog'
import { marketZones } from '../data/marketZones'

const quickStats = [
  { icon: Clock3, label: 'Jam Operasional', value: '07:00–17:00', note: 'Setiap hari buka' },
  { icon: Users, label: 'Est. Pengunjung', value: '1,250+', note: 'Rata-rata tiap hari' },
  { icon: Store, label: 'Kategori', value: '4 Sektor', note: 'Pasar tematik aktif' },
  { icon: MessageCircle, label: 'Anggota', value: '340 Active', note: 'Terhubung komunitas' },
]

const marketIcons = { burung: Bird, 'ikan-hias': Shell, bunga: Flower2, 'hewan-peliharaan': PawPrint }

const discussions = [
  { initials: 'RW', name: 'Rina Wulandari', time: '25 menit lalu', category: 'Bunga', title: 'Tips merawat monstera saat musim hujan?', replies: 18, views: 32 },
  { initials: 'DP', name: 'Dimas Prasetyo', time: '1 jam lalu', category: 'Burung', title: 'Rekomendasi pakan untuk kenari pemula', replies: 12, views: 24 },
  { initials: 'FS', name: 'Fajar Santoso', time: '2 jam lalu', category: 'Ikan Hias', title: 'Kapan aquascape akhir pekan ini?', replies: 8, views: 48 },
]

export default function DashboardPage() {
  const dateLabel = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())

  return (
    <div className="page-content dashboard-page">
      <div className="dashboard-greeting"><div><span className="page-eyebrow">{dateLabel.toLocaleUpperCase('id-ID')}</span><h1>Selamat pagi, Aulia 👋</h1><p>Temukan inspirasi baru dan pasar dari komunitas hari ini.</p></div><span className="market-open-pill"><i /> Pasar sedang buka</span></div>
      <section className="dashboard-hero">
        <div className="dashboard-hero-copy"><span className="hero-eyebrow">PASAR LOKAL · CERITA TUMBUH BERSAMA</span><h2>Pasar Splendid Malang</h2><p>Jelajahi keberagaman pasar tematik, jelajahi setiap sektor, dan temukan komunitas Anda.</p><div className="hero-action-row"><Link className="hero-button" to="/admin/pasar/burung">Jelajahi Pasar <ArrowRight size={13} /></Link><span><MapPin size={12} /> Jl. Arjuno, Malang</span></div></div>
      </section>

      <section className="quick-stats" aria-label="Ringkasan pasar">
        {quickStats.map(({ icon: Icon, label, value, note }) => <article className="quick-stat" key={label}><span className="quick-stat-icon"><Icon size={15} /></span><div><small>{label}</small><strong>{value}</strong><span>{note}</span></div></article>)}
      </section>

      <section className="dashboard-section">
        <div className="section-heading"><div><h2>Jelajahi empat sektor</h2><p>Temukan kios, cerita, dan hal baru dari pasar.</p></div><Link className="subtle-link" to="/admin/peta-lokasi">Temukan yang Anda sukai <ArrowUpRight size={13} /></Link></div>
        <div className="sector-grid">
          {marketZones.map(({ id, route, name, className }) => {
            const market = marketCatalog[route]
            const Icon = marketIcons[route]
            return <Link className="sector-card" to={`/admin/pasar/${route}`} key={route}><img src={`/media/market/${market.imageKey}-1.jpg`} alt="" /><span className={`sector-badge ${className}`}><Icon size={13} /> Zona {id}</span><div className="sector-card-copy"><div><h3>{name}</h3><p>{market.description.split(',')[0]}</p></div><span>{route === 'burung' ? '6' : '8'} kios pilihan</span></div><div className="sector-card-link">Jelajahi sektor <ArrowUpRight size={13} /></div></Link>
          })}
        </div>
      </section>

      <section className="dashboard-section community-preview">
        <div className="section-heading"><div><h2>Obrolan komunitas</h2><p>Tanya, berbagi, dan belajar dari sesama pedagang.</p></div><Link className="button-small-primary" to="/admin/forum">+ Buat Diskusi Baru</Link></div>
        <div className="dashboard-discussions">
          {discussions.map((discussion) => <Link className="dashboard-discussion" to="/admin/forum" key={discussion.title}><span className="avatar avatar-soft">{discussion.initials}</span><span className="discussion-copy"><strong>{discussion.title}</strong><small>{discussion.name} · {discussion.time}</small></span><span className="discussion-tag">{discussion.category}</span><span className="discussion-counts"><MessageCircle size={12} /> {discussion.replies}<Users size={12} /> {discussion.views}</span></Link>)}
        </div>
        <Link className="discussion-more" to="/admin/forum">Lihat semua diskusi <ArrowRight size={12} /></Link>
      </section>

      <section className="dashboard-section map-preview-section">
        <div className="section-heading"><div><h2>Peta Lokasi & Denah</h2><p>Jelajahi Zona A–D, temukan kios pilihan dan arah.</p></div><Link className="outline-action" to="/admin/peta-lokasi"><MapPin size={12} /> Buka Peta Pasar</Link></div>
        <div className="dashboard-map-card"><MarketPlan compact /><div className="map-preview-legend"><span><i className="legend-dot legend-green" /> Sektor aktif</span><span><i className="legend-dot legend-blue" /> Informasi lokasi</span><span>Jl. Arjuno <ArrowUpRight size={11} /></span></div></div>
      </section>
      <footer className="page-footer"><span>Pasar Splendid Malang · Ruang tumbuh untuk pasar dan komunitas.</span><span>© 2026</span></footer>
    </div>
  )
}
