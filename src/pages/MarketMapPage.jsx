import { useMemo, useState } from 'react'
import { ArrowUpRight, CarFront, Clock3, MapPin, Navigation, Search, Signpost, Trees } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import MarketPlan from '../components/map/MarketPlan'
import PageHeader from '../components/shared/PageHeader'
import { marketCatalog } from '../data/marketCatalog'
import { marketZones } from '../data/marketZones'
import { useToast } from '../hooks/useToast'

export default function MarketMapPage() {
  const [searchParams] = useSearchParams()
  const [selectedBooth, setSelectedBooth] = useState(searchParams.get('booth') || 'A-01')
  const [searchTerm, setSearchTerm] = useState('')
  const [zoneFilter, setZoneFilter] = useState('Semua zona')
  const [zoom, setZoom] = useState(100)
  const showToast = useToast()

  const activeZone = selectedBooth.slice(0, 1)
  const zoneData = marketZones.find((zone) => zone.id === activeZone) ?? marketZones[0]
  const market = marketCatalog[zoneData.route]
  const boothProduct = useMemo(() => market.products.find((product) => product[2] === selectedBooth) ?? market.products[0], [market, selectedBooth])
  const visibleZones = marketZones.filter((zone) => (zoneFilter === 'Semua zona' || zone.id === zoneFilter)
    && (!searchTerm || `${zone.name} zona ${zone.id}`.toLocaleLowerCase('id').includes(searchTerm.toLocaleLowerCase('id'))))

  const chooseZone = (zone) => {
    const first = marketCatalog[zone.route].products[0]
    setSelectedBooth(first[2])
    setZoneFilter(zone.id)
  }

  const chooseZoneOnMap = (zoneId) => {
    const zone = marketZones.find((item) => item.id === zoneId)
    if (!zone) return
    const first = marketCatalog[zone.route].products[0]
    setSelectedBooth(first[2])
    setZoneFilter('Semua zona')
  }

  return (
    <div className="page-content map-page">
      <PageHeader title="Peta Lokasi & Denah" section="JELAJAHI / PETA LOKASI PASAR" description="Kenali empat zona pasar dan temukan jalan menuju kios pilihan Anda." actions={<button className="outline-action" type="button" onClick={() => showToast('Peta jalan Pasar Splendid, Jl. Arjuno, Malang.')}><MapPin size={13} /> Buka Google Maps</button>} />
      <div className="map-search-row"><label className="market-search map-search"><Search size={14} /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} aria-label="Cari lokasi pasar" placeholder="Cari lokasi pasar..." /></label><select className="sort-select zone-filter" value={zoneFilter} aria-label="Filter zona" onChange={(event) => setZoneFilter(event.target.value)}><option>Semua zona</option>{marketZones.map((zone) => <option key={zone.id} value={zone.id}>Zona {zone.id} · {zone.name}</option>)}</select><span className="map-address"><MapPin size={12} /> Jl. Arjuno, Kota Malang</span></div>

      <div className="map-page-layout">
        <aside className="zone-sidebar">
          <div className="zone-list-heading"><div><h2>Zona pasar</h2><p>Empat sektor, satu tujuan. Pilih zona untuk melihat arah pasar.</p></div><span className="zone-count">32 kios</span></div>
          <div className="zone-list">
            {visibleZones.map((zone) => { const Icon = zone.icon; return <button className={`zone-list-item ${activeZone === zone.id ? 'is-active' : ''}`} type="button" onClick={() => chooseZone(zone)} key={zone.id}><span className={`zone-list-icon ${zone.className}`}><Icon size={15} /></span><span><strong>{zone.name}</strong><small>Zona {zone.id} · 6 kios aktif</small></span><ArrowUpRight size={14} /></button> })}
            {visibleZones.length === 0 && <p className="zone-empty">Zona tidak ditemukan.</p>}
          </div>
          <div className="selected-kiosk-card"><span className="section-eyebrow">HASIL PENCARIAN · 1 KIOS</span><span className="kiosk-zone-label">Zona {activeZone} · {selectedBooth}</span><h3>{boothProduct[0]}</h3><p>{boothProduct[1]} di Pasar Splendid Malang.</p><span className="kiosk-availability">● Buka hari ini · 07:00–17:00 WIB</span><button className="button-small-primary" type="button" onClick={() => showToast(`Rute berjalan menuju kios ${selectedBooth}.`)}><Navigation size={12} /> Tunjukkan rute</button></div>
        </aside>

        <section className="map-main-panel">
          <div className="map-panel-heading"><div><span className="map-panel-badge"><MapPin size={12} /> Denah pasar</span><h2>Pasar Splendid Malang</h2></div><span className="north-indicator">A<br /><b>↑</b></span></div>
          <MarketPlan selectedBooth={selectedBooth} onSelectBooth={setSelectedBooth} onSelectZone={chooseZoneOnMap} style={{ '--plan-scale': zoom / 100 }} />
          <div className="map-canvas-footer"><div className="map-legend"><span><i className="legend-dot legend-green" />Zona aktif</span><span><i className="legend-dot legend-blue" />Kios pilihan</span><span><i className="legend-dot legend-muted" />Ruang umum</span></div><span>Jl. Arjuno</span><div className="map-zoom-controls"><button type="button" aria-label="Perbesar peta" disabled={zoom >= 120} onClick={() => setZoom((value) => Math.min(120, value + 10))}>+</button><span>{zoom}%</span><button type="button" aria-label="Perkecil peta" disabled={zoom <= 90} onClick={() => setZoom((value) => Math.max(90, value - 10))}>−</button></div></div>
        </section>
      </div>

      <section className="map-info-row"><article><span className="map-info-icon"><Clock3 size={14} /></span><div><strong>Jam kunjungan</strong><small>Setiap hari, 07:00–17:00 WIB</small></div></article><article><span className="map-info-icon"><CarFront size={15} /></span><div><strong>Parkir & akses</strong><small>Area parkir tersedia untuk pengunjung.</small></div></article><article><span className="map-info-icon"><Trees size={15} /></span><div><strong>Jelajahi dengan berjalan</strong><small>Rute ramah pejalan kaki di seluruh zona.</small></div></article></section>
      <div className="map-caption"><Signpost size={12} /><span>Denah sketsa menunjukkan orientasi, blok, dan kegiatan lapangan. Ikon kios, pembagian zona, dan ketersediaan dapat berubah.</span><Link to={`/admin/pasar/${zoneData.route}`}>Lihat {zoneData.name} <ArrowUpRight size={11} /></Link></div>
      <footer className="page-footer"><span>Pasar Splendid Malang · Ruang tumbuh untuk pasar dan komunitas.</span><span>Zona {activeZone} · {market.name}</span></footer>
    </div>
  )
}
