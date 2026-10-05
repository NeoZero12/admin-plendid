export default function BoothTile({ booth, selected, onSelect }) {
  return (
    <button className={`map-booth booth-${booth.color} ${selected ? 'is-selected' : ''} ${booth.status === 'Kosong' ? 'is-vacant' : ''}`} type="button" onClick={() => onSelect(booth.id)} aria-pressed={selected}>
      <span className="map-booth-status" />
      <strong>{booth.id}</strong>
      <small>{booth.name}</small>
      <span className="map-booth-category">{booth.status === 'Terisi' ? 'TERISI' : 'KOSONG'}</span>
    </button>
  )
}
