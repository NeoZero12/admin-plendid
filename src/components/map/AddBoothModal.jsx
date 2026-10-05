import { useState } from 'react'
import { ChevronDown, MapPin, Plus, X } from 'lucide-react'

export default function AddBoothModal({ marketName, onClose, onCreate }) {
  const [name, setName] = useState('')
  const [area, setArea] = useState('Blok A')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!name.trim()) return
    onCreate({ name, area })
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="add-modal" role="dialog" aria-modal="true" aria-labelledby="add-booth-title">
        <div className="modal-heading">
          <div><span className="modal-icon"><Plus size={19} /></span><span className="modal-eyebrow">MANAJEMEN DENAH</span><h2 id="add-booth-title">Tambah booth baru</h2><p>Tambahkan titik booth ke denah {marketName}.</p></div>
          <button className="icon-button" type="button" aria-label="Tutup" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="form-field"><span>Nama booth</span><input required maxLength={60} value={name} onChange={(event) => setName(event.target.value)} placeholder="Contoh: Kios Bunga Mawar" autoFocus /></label>
          <label className="form-field"><span>Area pasar</span><span className="select-field"><select value={area} onChange={(event) => setArea(event.target.value)}><option>Blok A</option><option>Blok B</option></select><ChevronDown size={15} /></span></label>
          <div className="modal-note"><MapPin size={15} /><span>Booth baru akan ditambahkan dengan status <strong>Kosong</strong> dan tampil di denah {marketName}.</span></div>
          <div className="modal-actions"><button type="button" className="subtle-button" onClick={onClose}>Batal</button><button type="submit" className="primary-button"><Plus size={16} /> Tambahkan booth</button></div>
        </form>
      </section>
    </div>
  )
}
