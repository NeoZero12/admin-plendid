import { Heart, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProductCard({ market, product, index, favorite, onToggleFavorite }) {
  const [name, type, booth, price] = product
  return (
    <article className="product-card">
      <Link className="product-image-link" to={`/admin/peta-lokasi?booth=${booth}`} aria-label={`Lihat ${name} di denah`}>
        <img className="product-image" src={`/media/market/${market.imageKey}-${index + 1}.jpg`} alt={`${type} di kios ${name}`} loading="eager" />
      </Link>
      <div className="product-card-body">
        <div className="product-card-topline"><span>{type}</span><button className={`favorite-button ${favorite ? 'is-favorite' : ''}`} type="button" aria-label={favorite ? `Hapus ${name} dari favorit` : `Simpan ${name} ke favorit`} onClick={() => onToggleFavorite(name)}><Heart size={14} fill={favorite ? 'currentColor' : 'none'} /></button></div>
        <Link className="product-name" to={`/admin/peta-lokasi?booth=${booth}`}>{name}</Link>
        <span className="product-location"><MapPin size={11} /> {market.zone} • {booth}</span>
        <div className="product-card-footer"><span className="product-price-label">Kisaran harga</span><strong>{price}</strong></div>
      </div>
    </article>
  )
}
