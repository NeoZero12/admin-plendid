import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import BoothTable from '../components/map/BoothTable'
import PageHeader from '../components/shared/PageHeader'
import { useBooths } from '../hooks/useBooths'

export default function BoothDirectoryPage() {
  const { booths } = useBooths()

  return (
    <div className="page-content">
      <PageHeader title="Daftar Booth" section="MANAJEMEN" description="Periksa nomor, area, kategori, dan status setiap booth." actions={<Link className="primary-button" to="/admin/peta-lokasi"><Plus size={16} /> Tambah Booth</Link>} />
      <BoothTable booths={booths} title="Semua booth" />
      <footer className="page-footer"><span>Data booth tersinkron dengan denah lokasi.</span><Link to="/admin/peta-lokasi">Buka denah <span aria-hidden="true">↗</span></Link></footer>
    </div>
  )
}
