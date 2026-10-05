import { useMemo, useState } from 'react'
import { BarChart3, Check, CircleDollarSign, Download, FileText, Search, TrendingUp } from 'lucide-react'
import PageHeader from '../components/shared/PageHeader'
import StatCard from '../components/shared/StatCard'
import { useToast } from '../hooks/useToast'

const transactions = [
  { id: 'TRX-2084', tenant: 'Rina Puspita', detail: 'Perpanjangan sewa booth A-01', date: '05 Okt 2026 · 10.14', amount: 'Rp 1.250.000', status: 'Berhasil' },
  { id: 'TRX-2083', tenant: 'Dewi Anggraini', detail: 'Pembayaran sewa booth A-02', date: '05 Okt 2026 · 09.52', amount: 'Rp 980.000', status: 'Berhasil' },
  { id: 'TRX-2082', tenant: 'Fajar Nugraha', detail: 'Perpanjangan sewa booth A-04', date: '04 Okt 2026 · 16.35', amount: 'Rp 1.450.000', status: 'Menunggu' },
  { id: 'TRX-2081', tenant: 'Maya Lestari', detail: 'Pembayaran layanan pasar', date: '04 Okt 2026 · 14.20', amount: 'Rp 350.000', status: 'Berhasil' },
]

const sixMonths = [
  { month: 'Mei', value: 47 }, { month: 'Jun', value: 63 }, { month: 'Jul', value: 54 },
  { month: 'Agu', value: 74 }, { month: 'Sep', value: 66 }, { month: 'Okt', value: 88 },
]
const twelveMonths = [
  { month: "Nov '25", value: 44 }, { month: 'Des', value: 53 }, { month: 'Jan', value: 49 },
  { month: 'Feb', value: 58 }, { month: 'Mar', value: 61 }, { month: 'Apr', value: 55 },
  ...sixMonths,
]

export default function OperationsPage({ mode }) {
  const isReport = mode === 'report'
  const showToast = useToast()
  const [query, setQuery] = useState('')
  const [period, setPeriod] = useState('6 bulan')
  const visibleTransactions = useMemo(() => transactions.filter((item) => `${item.id} ${item.tenant} ${item.detail}`.toLocaleLowerCase('id').includes(query.toLocaleLowerCase('id'))), [query])
  const chartMonths = period === '12 bulan' ? twelveMonths : sixMonths

  if (isReport) {
    return (
      <div className="page-content">
        <PageHeader title="Laporan" section="ANALITIK" description="Ringkasan performa operasional dan penerimaan pasar." actions={<button className="subtle-button report-export" type="button" onClick={() => showToast('Laporan berhasil disiapkan untuk diunduh.')}><Download size={15} /> Ekspor laporan</button>} />
        <section className="stats-grid directory-stats">
          <StatCard icon={CircleDollarSign} tone="green" value="Rp 24,8 jt" label="Penerimaan bulan ini" trend={<><span className="trend-up">↗</span> 12,2%</>} progress={82} />
          <StatCard icon={TrendingUp} tone="purple" value="80%" label="Rata-rata okupansi" trend="+4,2%" progress={80} />
          <StatCard icon={FileText} tone="navy" value="256" unit="transaksi" label="Transaksi tercatat" trend="Bulan berjalan" progress={75} />
        </section>
        <section className="report-grid">
          <article className="panel report-chart-panel">
            <div className="section-panel-heading"><div><span className="section-kicker">PENERIMAAN PASAR</span><h2>Tren pendapatan</h2><p>Perbandingan penerimaan selama {period.toLocaleLowerCase('id')} terakhir.</p></div><label className="period-select"><select value={period} onChange={(event) => setPeriod(event.target.value)}><option>6 bulan</option><option>12 bulan</option></select></label></div>
            <div className="report-chart"><div className="chart-axis"><span>30 jt</span><span>20 jt</span><span>10 jt</span><span>0</span></div><div className="chart-bars" style={{ '--chart-count': chartMonths.length }}>{chartMonths.map((item, index) => <div className="chart-column" key={`${item.month}-${index}`}><div className="chart-bar-track"><span className={index === chartMonths.length - 1 ? 'chart-bar-current' : ''} style={{ height: `${item.value}%` }} /></div><small>{item.month}</small></div>)}</div></div>
          </article>
          <article className="panel report-insight"><div className="insight-icon"><BarChart3 size={18} /></div><span className="section-kicker">INSIGHT BULAN INI</span><h2>Aktivitas pasar terus tumbuh</h2><p>Penerimaan meningkat <strong>12,2%</strong> dibandingkan bulan sebelumnya. Pasar Buah mencatat okupansi tertinggi.</p><div className="insight-stat"><span>Pasar dengan okupansi tertinggi</span><strong>Pasar Buah · 88%</strong></div></article>
        </section>
      </div>
    )
  }

  return (
    <div className="page-content">
      <PageHeader title="Transaksi" section="KEUANGAN" description="Pantau pembayaran sewa dan aktivitas transaksi pasar." actions={<button className="subtle-button report-export" type="button" onClick={() => showToast('Daftar transaksi berhasil disiapkan.')}><Download size={15} /> Ekspor data</button>} />
      <section className="stats-grid directory-stats">
        <StatCard icon={CircleDollarSign} tone="navy" value="Rp 24,8 jt" label="Total bulan ini" trend={<><span className="trend-up">↗</span> 12,2%</>} progress={82} />
        <StatCard icon={Check} tone="green" value="241" unit="transaksi" label="Pembayaran berhasil" trend="94% selesai" progress={94} />
        <StatCard icon={FileText} tone="orange" value="15" unit="transaksi" label="Menunggu pembayaran" trend="Perlu ditinjau" progress={18} />
      </section>
      <section className="panel directory-panel">
        <div className="directory-heading"><div><h2>Riwayat transaksi</h2><p>Aktivitas terbaru dari seluruh pasar.</p></div><label className="list-search"><Search size={15} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari transaksi atau tenant" aria-label="Cari transaksi" /></label></div>
        <div className="table-scroll"><table>
          <thead><tr><th>ID TRANSAKSI</th><th>TENANT</th><th>DETAIL</th><th>TANGGAL</th><th>NOMINAL</th><th>STATUS</th></tr></thead>
          <tbody>{visibleTransactions.map((item) => <tr key={item.id}><td><span className="table-booth-code">{item.id}</span></td><td>{item.tenant}</td><td>{item.detail}</td><td>{item.date}</td><td><strong>{item.amount}</strong></td><td><span className={`table-status ${item.status === 'Menunggu' ? 'table-status-empty' : ''}`}><i />{item.status}</span></td></tr>)}{visibleTransactions.length === 0 && <tr><td className="empty-results" colSpan="6">Transaksi tidak ditemukan.</td></tr>}</tbody>
        </table></div>
        <div className="directory-footer">Menampilkan <strong>{visibleTransactions.length}</strong> transaksi terbaru</div>
      </section>
    </div>
  )
}
