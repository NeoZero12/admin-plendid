import { useMemo, useState } from 'react'
import { Building2, MapPin, Plus, Search, Users } from 'lucide-react'
import PageHeader from '../components/shared/PageHeader'
import StatCard from '../components/shared/StatCard'
import { useBooths } from '../hooks/useBooths'
import { useToast } from '../hooks/useToast'

export default function TenantPage() {
  const { booths } = useBooths()
  const showToast = useToast()
  const [query, setQuery] = useState('')
  const tenants = useMemo(() => booths.filter((booth) => booth.tenant !== '—'), [booths])
  const filteredTenants = tenants.filter((booth) => `${booth.tenant} ${booth.id} ${booth.category}`.toLocaleLowerCase('id').includes(query.toLocaleLowerCase('id')))

  return (
    <div className="page-content">
      <PageHeader title="Data Tenant" section="MANAJEMEN" description="Kelola informasi penyewa dan booth yang digunakan." actions={<button className="primary-button" type="button" onClick={() => showToast('Form tenant dapat dibuka setelah data terhubung.') }><Plus size={16} /> Tambah Tenant</button>} />
      <section className="stats-grid directory-stats">
        <StatCard icon={Users} tone="navy" value={tenants.length + 100} unit="tenant aktif" label="Tenant terdaftar" trend="Semua pasar" progress={82} />
        <StatCard icon={Building2} tone="green" value="3" unit="pasar" label="Lokasi tenant" trend="Terhubung" progress={100} />
        <StatCard icon={MapPin} tone="purple" value="12" unit="kategori" label="Jenis usaha" trend="Data terbaru" progress={70} />
      </section>
      <section className="panel directory-panel">
        <div className="directory-heading"><div><h2>Daftar tenant</h2><p>Data tenant yang terhubung dengan booth di Pasar Bunga.</p></div><label className="list-search"><Search size={15} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama atau booth" aria-label="Cari tenant" /></label></div>
        <div className="table-scroll"><table>
          <thead><tr><th>TENANT</th><th>NOMOR BOOTH</th><th>AREA</th><th>KATEGORI</th><th>STATUS</th></tr></thead>
          <tbody>
            {filteredTenants.map((booth) => (
              <tr key={booth.id}><td><span className="tenant-cell"><span className="tenant-avatar">{booth.tenant.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span><strong>{booth.tenant}</strong></span><small className="tenant-email">Tenant Pasar Splendid</small></td><td><span className="table-booth-code">{booth.id}</span></td><td><span className="area-cell"><MapPin size={13} />{booth.area}</span></td><td><span className="category-tag">{booth.category}</span></td><td><span className="table-status"><i />Aktif</span></td></tr>
            ))}
            {filteredTenants.length === 0 && <tr><td className="empty-results" colSpan="5">Tenant tidak ditemukan.</td></tr>}
          </tbody>
        </table></div>
        <div className="directory-footer">Menampilkan <strong>{filteredTenants.length}</strong> dari <strong>{tenants.length}</strong> tenant aktif</div>
      </section>
    </div>
  )
}
