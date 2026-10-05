import { useMemo, useState } from 'react'
import { ChevronRight, ClipboardList, Filter, MapPin, Search } from 'lucide-react'

const pageSize = 5

export default function BoothTable({ booths, marketName = 'Pasar Bunga', title = 'Daftar booth' }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Semua')
  const [page, setPage] = useState(1)

  const filteredBooths = useMemo(() => booths.filter((booth) => {
    const haystack = `${booth.id} ${booth.name} ${booth.tenant} ${booth.category}`.toLocaleLowerCase('id')
    const matchesSearch = haystack.includes(searchTerm.toLocaleLowerCase('id'))
    const matchesStatus = statusFilter === 'Semua' || booth.status === statusFilter
    return matchesSearch && matchesStatus
  }), [booths, searchTerm, statusFilter])
  const pageCount = Math.max(1, Math.ceil(filteredBooths.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const pageRows = filteredBooths.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const pageNumbers = Array.from({ length: Math.min(pageCount, 3) }, (_, index) => index + 1)

  const updateSearch = (value) => {
    setSearchTerm(value)
    setPage(1)
  }

  const updateStatus = (value) => {
    setStatusFilter(value)
    setPage(1)
  }

  return (
    <section className="panel booth-list-panel">
      <div className="booth-list-heading">
        <div>
          <div className="panel-title-line"><span className="panel-title-icon list-title-icon"><ClipboardList size={17} /></span><h2>{title}</h2><span className="list-count">{filteredBooths.length} booth</span></div>
          <p className="panel-subtitle">Informasi booth dan tenant di {marketName}.</p>
        </div>
        <div className="list-actions">
          <label className="list-search"><Search size={15} /><input type="search" value={searchTerm} onChange={(event) => updateSearch(event.target.value)} placeholder="Cari booth atau tenant" aria-label="Cari booth atau tenant" /></label>
          <div className="filter-wrap"><Filter size={14} /><select aria-label="Filter status booth" value={statusFilter} onChange={(event) => updateStatus(event.target.value)}><option>Semua</option><option>Terisi</option><option>Kosong</option></select><span aria-hidden="true">⌄</span></div>
        </div>
      </div>
      <div className="table-scroll">
        <table>
          <thead><tr><th>BOOTH</th><th>NAMA TENANT</th><th>AREA</th><th>KATEGORI</th><th>STATUS</th><th><span className="sr-only">Aksi</span></th></tr></thead>
          <tbody>
            {pageRows.map((booth) => (
              <tr key={booth.id}>
                <td><span className="table-booth-code"><span className={`booth-mini-dot ${booth.color}`} />{booth.id}</span><small>{booth.name}</small></td>
                <td><span className="tenant-cell"><span className="tenant-avatar">{booth.tenant === '—' ? '+' : booth.tenant.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span>{booth.tenant}</span></td>
                <td><span className="area-cell"><MapPin size={13} />{booth.area}</span></td>
                <td><span className="category-tag">{booth.category}</span></td>
                <td><span className={`table-status ${booth.status === 'Kosong' ? 'table-status-empty' : ''}`}><i />{booth.status}</span></td>
                <td><span className="row-action row-action-static" aria-hidden="true">···</span></td>
              </tr>
            ))}
            {pageRows.length === 0 && <tr><td className="empty-results" colSpan="6">Tidak ada booth yang cocok dengan pencarian.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <span>Menampilkan <strong>{pageRows.length ? (currentPage - 1) * pageSize + 1 : 0}–{(currentPage - 1) * pageSize + pageRows.length}</strong> dari <strong>{filteredBooths.length}</strong> booth</span>
        <div className="pagination">
          <button type="button" aria-label="Halaman sebelumnya" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}><ChevronRight size={15} className="chevron-back" /></button>
          {pageNumbers.map((number) => <button className={currentPage === number ? 'page-current' : ''} type="button" key={number} aria-current={currentPage === number ? 'page' : undefined} onClick={() => setPage(number)}>{number}</button>)}
          {pageCount > 3 && <><span>…</span><button type="button" onClick={() => setPage(pageCount)}>{pageCount}</button></>}
          <button type="button" aria-label="Halaman berikutnya" disabled={currentPage === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}><ChevronRight size={15} /></button>
        </div>
      </div>
    </section>
  )
}
