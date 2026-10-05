import { CircleHelp, Download, Map, MapPin, MoreHorizontal, ZoomIn, ZoomOut } from 'lucide-react'
import BoothTile from './BoothTile'

export default function BoothMap({ marketName, booths, boothCount, occupiedCount, vacantCount, selectedBoothId, onSelectBooth, activeArea, onAreaChange, zoom, onZoomChange, onExport, showToast }) {
  const rowSize = activeArea === 'Semua area' ? 6 : 3
  const topRow = booths.slice(0, rowSize)
  const bottomRow = booths.slice(rowSize)

  return (
    <article className="panel map-panel">
      <div className="panel-header map-panel-header">
        <div>
          <div className="panel-title-line"><span className="panel-title-icon"><Map size={17} /></span><h2>Denah {marketName}</h2><span className="live-status"><span /> Aktif</span></div>
          <p className="panel-subtitle">Pilih booth untuk melihat informasi dan status tenant.</p>
        </div>
        <div className="map-panel-actions">
          <button className="subtle-button export-button" type="button" onClick={onExport}><Download size={15} /><span>Ekspor</span></button>
          <button className="icon-button more-button" type="button" aria-label="Opsi denah" onClick={() => showToast('Pilih blok atau booth untuk melihat detail denah.')}><MoreHorizontal size={18} /></button>
        </div>
      </div>

      <div className="map-toolbar">
        <div className="map-tabs" role="tablist" aria-label="Area denah">
          {[
            { label: 'Semua area', count: String(boothCount) },
            { label: 'Blok A' },
            { label: 'Blok B' },
          ].map((tab) => (
            <button className={`map-tab ${activeArea === tab.label ? 'is-selected' : ''}`} type="button" role="tab" aria-selected={activeArea === tab.label} key={tab.label} onClick={() => onAreaChange(tab.label)}>
              {tab.label}{tab.count && <span>{tab.count}</span>}
            </button>
          ))}
        </div>
        <div className="map-zoom-tools">
          <button className="icon-button zoom-control" type="button" aria-label="Perkecil denah" onClick={() => onZoomChange((value) => Math.max(value - 10, 80))}><ZoomOut size={15} /></button>
          <span>{zoom}%</span>
          <button className="icon-button zoom-control" type="button" aria-label="Perbesar denah" onClick={() => onZoomChange((value) => Math.min(value + 10, 120))}><ZoomIn size={15} /></button>
          <span className="zoom-divider" />
          <button className="icon-button zoom-control focus-map" type="button" aria-label="Atur ulang zoom" onClick={() => onZoomChange(100)}><span className="focus-frame" /></button>
        </div>
      </div>

      <div className="map-viewport">
        <div className="map-floor" style={{ '--map-zoom': zoom / 100 }}>
          <div className="map-floor-caption"><span className="floor-pin"><MapPin size={13} /></span><span>LANTAI 1</span><span className="floor-caption-line" /><span className="floor-live"><span /> Peta diperbarui hari ini</span></div>
          <div className="floor-entrance"><span className="entrance-arrow">↓</span><span>GERBANG UTAMA</span><span className="entrance-arrow">↓</span></div>
          <div className={`stall-row ${activeArea !== 'Semua area' ? 'compact-row' : ''}`}>
            {topRow.map((booth) => <BoothTile key={booth.id} booth={booth} selected={selectedBoothId === booth.id} onSelect={onSelectBooth} />)}
          </div>
          {bottomRow.length > 0 && <>
            <div className="floor-walkway"><span>JALUR PENGUNJUNG</span><span className="walkway-dots">· · · · · · · · · · · · · · · · · · ·</span><span>4 m</span></div>
            <div className={`stall-row stall-row-bottom ${activeArea !== 'Semua area' ? 'compact-row' : ''}`}>
              {bottomRow.map((booth) => <BoothTile key={booth.id} booth={booth} selected={selectedBoothId === booth.id} onSelect={onSelectBooth} />)}
            </div>
          </>}
          <div className="map-compass"><span>N</span><span className="compass-arrow">↑</span></div>
          <div className="floor-scale"><span /><small>5 m</small></div>
        </div>
      </div>

      <div className="map-legend">
        <span className="legend-heading">KETERANGAN</span>
        <span><i className="legend-swatch legend-green" /> Terisi <strong>{occupiedCount}</strong></span>
        <span><i className="legend-swatch legend-yellow" /> Kosong <strong>{vacantCount}</strong></span>
        <span><i className="legend-swatch legend-gray" /> Area umum</span>
        <button className="legend-help" type="button" onClick={() => showToast('Warna hijau menandakan booth terisi, kuning untuk booth kosong.')}><CircleHelp size={14} /> Bantuan</button>
      </div>
    </article>
  )
}
