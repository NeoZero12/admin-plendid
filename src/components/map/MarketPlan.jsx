import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { marketZones } from '../../data/marketZones'

export default function MarketPlan({ compact = false, selectedBooth, onSelectBooth, onSelectZone, style }) {
  const [localSelection, setLocalSelection] = useState('A-01')
  const activeBooth = selectedBooth ?? localSelection

  const selectBooth = (boothId) => {
    setLocalSelection(boothId)
    onSelectBooth?.(boothId)
  }

  return (
    <div className={`market-plan ${compact ? 'is-compact' : ''}`} style={style}>
      <div className="plan-top-road"><span>Ruang hijau pasar</span></div>
      <div className="plan-map-grid">
        {marketZones.map(({ id, name, icon: Icon, className, booths }) => (
          <section className={`map-zone ${className} ${activeBooth?.startsWith(id) ? 'zone-is-active' : ''}`} key={id}>
            <button className="map-zone-title" type="button" onClick={() => onSelectZone?.(id)}><span className="zone-icon"><Icon size={13} /></span><strong>{name}</strong><small>Zona {id}</small></button>
            <div className="map-stalls">
              {booths.map((boothId, index) => <button className={`map-stall ${activeBooth === boothId ? 'stall-is-active' : ''}`} type="button" onClick={() => selectBooth(boothId)} aria-label={`Pilih kios ${boothId}`} key={boothId}><span>{boothId}</span><i className={index === 2 ? 'stall-empty' : ''} /></button>)}
            </div>
            <span className="zone-merchant-count"><MapPin size={10} /> 6 kios pilihan</span>
          </section>
        ))}
      </div>
      {!compact && <div className="plan-bottom-road"><span>Jl. Arjuno</span><span>Pintu masuk</span></div>}
      {compact && <div className="plan-entrance"><span>✦ Pintu masuk</span><span>P → Parkir</span></div>}
    </div>
  )
}
