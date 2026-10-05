import { useMemo, useState } from 'react'
import { ArrowUpRight, MapPin, Search, SlidersHorizontal } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import ProductCard from '../components/market/ProductCard'
import PageHeader from '../components/shared/PageHeader'
import { marketCatalog } from '../data/marketCatalog'
import { useToast } from '../hooks/useToast'

export default function MarketCategoryPage() {
  const { slug } = useParams()
  const market = marketCatalog[slug]
  const safeMarket = market ?? marketCatalog.burung
  const [activeFilter, setActiveFilter] = useState('Semua')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('recommended')
  const [favorites, setFavorites] = useState([])
  const showToast = useToast()

  const visibleProducts = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase('id')
    const result = safeMarket.products.filter((product) => {
      const [name, category, booth] = product
      return (activeFilter === 'Semua' || category === activeFilter)
        && `${name} ${category} ${booth}`.toLocaleLowerCase('id').includes(query)
    })
    if (sortOrder === 'name') result.sort((a, b) => a[0].localeCompare(b[0], 'id'))
    if (sortOrder === 'price') result.sort((a, b) => a[4] - b[4])
    return result
  }, [activeFilter, safeMarket, searchTerm, sortOrder])

  if (!market) return <Navigate replace to="/admin/dashboard" />

  const toggleFavorite = (name) => {
    const wasSaved = favorites.includes(name)
    setFavorites((current) => wasSaved ? current.filter((favorite) => favorite !== name) : [...current, name])
    showToast(wasSaved ? `${name} dihapus dari favorit.` : `${name} disimpan ke favorit.`)
  }

  return (
    <div className="page-content market-page">
      <PageHeader title={market.name} section={market.kicker} description={market.description} />
      <section className="category-hero" style={{ '--hero-image': `url(${market.hero})` }}>
        <div className="category-hero-copy">
          <span className="hero-eyebrow">ZONA {market.zone.slice(-1)} • 8 KIOS PILIHAN</span>
          <h2>{market.heroTitle}</h2>
          <p>{market.heroCopy}</p>
          <span className="hero-hours">◷ &nbsp;07:00–17:00 WIB</span>
          <Link className="hero-button" to={`/admin/peta-lokasi?zone=${encodeURIComponent(market.zone)}`}>Lihat Zona {market.zone.slice(-1)} di Peta <ArrowUpRight size={13} /></Link>
        </div>
      </section>

      <div className="market-filter-row">
        <div className="category-chips" role="tablist" aria-label={`Kategori ${market.name}`}>
          {market.filters.map((filter) => <button className={`category-chip ${activeFilter === filter ? 'is-selected' : ''}`} type="button" role="tab" aria-selected={activeFilter === filter} onClick={() => setActiveFilter(filter)} key={filter}>{filter}</button>)}
        </div>
        <button className="price-toggle" type="button" onClick={() => showToast('Menampilkan semua kisaran harga.')}><SlidersHorizontal size={13} /> Harga Semua</button>
      </div>

      <div className="section-heading market-list-heading">
        <div><h2>Kios di Zona {market.zone.slice(-1)}</h2><p>{visibleProducts.length} kios aktif · Pilih kios untuk melihat lokasinya</p></div>
        <div className="market-list-tools">
          <label className="market-search"><Search size={14} /><input type="search" aria-label="Cari nama kios atau kategori" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Cari nama kios di sekitar ini..." /></label>
          <select className="sort-select" aria-label="Urutkan kios" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}><option value="recommended">Rekomendasi</option><option value="name">Nama kios</option><option value="price">Harga terendah</option></select>
        </div>
      </div>

      {visibleProducts.length > 0 ? (
        <section className="product-grid" aria-label={`Daftar kios ${market.name}`}>
          {visibleProducts.map((product) => {
            const index = market.products.indexOf(product)
            return <ProductCard market={market} product={product} index={index} favorite={favorites.includes(product[0])} onToggleFavorite={toggleFavorite} key={product[2]} />
          })}
        </section>
      ) : <div className="empty-market-results">Tidak ada kios yang cocok dengan pencarian Anda.</div>}

      <div className="market-results-footer"><span>Menampilkan {visibleProducts.length ? `1–${visibleProducts.length}` : '0'} dari {market.products.length} kios</span><span>Semua kios ditampilkan</span></div>
      <div className="market-notice"><span className="notice-icon">i</span><p>Informasi kios merupakan contoh konseptual. Harga berupa kisaran, konfirmasi ketersediaan dan harga langsung kepada pedagang. Jika membawa hewan, pastikan mengikuti aturan pasar.</p><MapPin size={13} /></div>
      <footer className="page-footer"><span>Pasar Splendid Malang · Ruang tumbuh untuk pasar dan komunitas.</span><span>Informasi lokasi dapat berubah.</span></footer>
    </div>
  )
}
