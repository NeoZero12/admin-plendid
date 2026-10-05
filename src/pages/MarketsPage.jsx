import { Link } from 'react-router-dom'
import { ArrowUpRight, Building2, MapPin, Plus, Store, Users } from 'lucide-react'
import PageHeader from '../components/shared/PageHeader'
import { marketCards } from '../data/markets'
import { useToast } from '../hooks/useToast'

export default function MarketsPage() {
  const showToast = useToast()

  return (
    <div className="page-content">
      <PageHeader title="Data Pasar" section="MANAJEMEN PASAR" description="Kelola lokasi dan kapasitas pasar yang terhubung ke Pasar Splendid." actions={<button className="primary-button" type="button" onClick={() => showToast('Form pendaftaran pasar siap dihubungkan.') }><Plus size={16} /> Tambah Pasar</button>} />
      <div className="market-overview-line"><span className="market-overview-icon"><Store size={16} /></span><span><strong>3 pasar</strong> terdaftar dan aktif</span><span className="market-live-label"><i /> Seluruh sistem berjalan normal</span></div>
      <section className="market-card-grid">
        {marketCards.map((market, index) => {
          const occupancy = Math.round((market.occupied / market.booths) * 100)
          return (
            <article className={`panel market-card ${market.tint}`} key={market.name}>
              <div className="market-card-top"><span className="market-card-icon"><Store size={18} /></span><span className="market-card-status"><i /> Aktif</span><button className="icon-button" type="button" aria-label={`Opsi ${market.name}`} onClick={() => showToast(`Opsi ${market.name}`)}>···</button></div>
              <span className="market-card-index">PASAR 0{index + 1}</span>
              <h2>{market.name}</h2>
              <p className="market-card-address"><MapPin size={14} /> {market.location}</p>
              <div className="market-card-metrics"><span><Building2 size={14} /><strong>{market.booths}</strong> booth</span><span><Users size={14} /><strong>{market.occupied}</strong> tenant</span></div>
              <div className="market-card-progress"><span><small>Tingkat okupansi</small><strong>{occupancy}%</strong></span><div className="mini-track"><i style={{ width: `${occupancy}%` }} /></div></div>
              <Link className="market-card-link" to="/admin/peta-lokasi">Lihat denah pasar <ArrowUpRight size={15} /></Link>
            </article>
          )
        })}
        <button className="add-market-card" type="button" onClick={() => showToast('Form pendaftaran pasar siap dihubungkan.')}><span><Plus size={19} /></span><strong>Daftarkan pasar baru</strong><small>Hubungkan lokasi lain ke dashboard</small></button>
      </section>
      <footer className="page-footer"><span>© 2026 Pasar Splendid. Semua hak dilindungi.</span><span>Terakhir diperbarui <strong>hari ini</strong></span></footer>
    </div>
  )
}
