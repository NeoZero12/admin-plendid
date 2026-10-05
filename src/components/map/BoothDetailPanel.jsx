import { Building2, ClipboardList, Eye, MapPin, MoreHorizontal, Users } from 'lucide-react'

export default function BoothDetailPanel({ booth, marketName, showToast }) {
  return (
    <aside className="panel booth-detail-panel">
      <div className="detail-topline"><span className="detail-kicker">DETAIL BOOTH</span><button className="icon-button detail-more" type="button" aria-label="Menu booth" onClick={() => showToast(`Opsi ${booth.id}`)}><MoreHorizontal size={18} /></button></div>
      <div className="detail-code-row"><div><span className="detail-code-label">NOMOR BOOTH</span><h2>{booth.id}</h2></div><span className={`status-pill ${booth.status === 'Kosong' ? 'status-vacant' : ''}`}><span />{booth.status}</span></div>
      <div className={`detail-illustration ${booth.color}`}>
        <div className="illustration-shelf shelf-one" /><div className="illustration-shelf shelf-two" />
        <span className="plant plant-one">✿</span><span className="plant plant-two">❋</span><span className="plant plant-three">✾</span>
        <span className="illustration-label">{booth.category}</span>
      </div>
      <div className="detail-name-block"><h3>{booth.name}</h3><p><MapPin size={13} /> {booth.area} <span>·</span> {marketName}</p></div>
      <div className="detail-divider" />
      <div className="detail-info-list">
        <div className="detail-info-row"><span className="detail-info-label"><Users size={14} /> Nama tenant</span><strong>{booth.tenant}</strong></div>
        <div className="detail-info-row"><span className="detail-info-label"><ClipboardList size={14} /> Kategori</span><strong>{booth.category}</strong></div>
        <div className="detail-info-row"><span className="detail-info-label"><Building2 size={14} /> Luas area</span><strong>3 × 4 m</strong></div>
        <div className="detail-info-row"><span className="detail-info-label"><Eye size={14} /> Terakhir diperbarui</span><strong>Hari ini, 09.41</strong></div>
      </div>
      <button className="detail-action" type="button" onClick={() => showToast(`Detail ${booth.id} siap dibuka.`)}>Lihat detail booth <span aria-hidden="true">›</span></button>
    </aside>
  )
}
