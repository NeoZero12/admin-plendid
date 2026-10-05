import { useMemo, useState } from 'react'
import { ArrowUp, ChevronDown, ChevronRight, Heart, MessageCircle, MoreHorizontal, Plus, Send, Share2, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/shared/PageHeader'
import { useToast } from '../hooks/useToast'

const startTopics = [
  { initials: 'RW', author: 'Rina Wulandari', age: '25 menit lalu', category: 'Bunga', title: 'Tips merawat monstera saat musim hujan?', body: 'Daun monstera saya mulai layu beberapa hari terakhir. Teman-teman punya tips mengatur penyiraman dan posisi pot agar tetap sehat?', votes: 18, replies: 18, color: 'mint' },
  { initials: 'DP', author: 'Dimas Prasetyo', age: '1 jam lalu', category: 'Burung', title: 'Rekomendasi pakan untuk kenari pemula', body: 'Baru mulai memelihara kenari. Pakan apa yang paling cocok untuk menjaga kondisinya tetap aktif dan rajin berkicau?', votes: 24, replies: 12, color: 'blue' },
  { initials: 'FS', author: 'Fajar Santoso', age: '2 jam lalu', category: 'Ikan Hias', title: 'Kapan aquascape akhir pekan ini?', body: 'Yuk berbagi ide layout dan tanaman tank. Saya akan bawa beberapa bibit untuk bertukar di Zona B.', votes: 47, replies: 22, color: 'sand' },
  { initials: 'NR', author: 'Nadia Rahma', age: '3 jam lalu', category: 'Hewan Peliharaan', title: 'Checklist sebelum mengadopsi kelinci', body: 'Saya sedang mencari kandang dan perlengkapan yang aman. Apa saja kebutuhan awal yang perlu disiapkan?', votes: 31, replies: 9, color: 'rose' },
  { initials: 'AP', author: 'Aulia Putri', age: '5 jam lalu', category: 'Bunga', title: 'Bunga lokal untuk buket ulang tahun', body: 'Ada inspirasi buket dengan budget sekitar Rp100 ribu? Rekomendasi kombinasi bunga dari kios Zona C?', votes: 29, replies: 17, color: 'mint' },
  { initials: 'BS', author: 'Bayu Setiawan', age: '6 jam lalu', category: 'Ikan Hias', title: 'Air akuarium keruh setelah ganti filter', body: 'Akuarium 60 liter saya masih keruh setelah dua hari. Bagaimana menjaga bakteri baik saat mengganti media filter?', votes: 22, replies: 11, color: 'blue' },
  { initials: 'AN', author: 'Adi Nugroho', age: 'Kemarin', category: 'Burung', title: 'Cara membersihkan sangkar bambu dengan aman', body: 'Sangkar dari Sangkar Jaya, A-07, sudah dipakai tiga bulan. Bahan pembersih apa yang aman untuk burung?', votes: 14, replies: 8, color: 'sand' },
  { initials: 'PS', author: 'Pasar Splendid', age: 'Kemarin', category: 'Info Pasar', title: 'Mari jaga pasar tetap nyaman bersama', body: 'Bawa tas belanja sendiri, buang sampah pada tempatnya, dan gunakan jalur pejalan kaki. Ada ide lainnya?', votes: 36, replies: 13, color: 'mint' },
]

const filters = ['Semua', 'Burung', 'Ikan Hias', 'Bunga', 'Hewan Peliharaan', 'Info Pasar']

function NewDiscussionModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('Burung')
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (title.trim().length < 8 || body.trim().length < 12) {
      setError('Judul minimal 8 karakter dan cerita minimal 12 karakter.')
      return
    }
    onSubmit({ title: title.trim(), body: body.trim(), category })
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="discussion-modal" role="dialog" aria-modal="true" aria-labelledby="new-discussion-title"><button className="modal-close" type="button" aria-label="Tutup" onClick={onClose}>×</button><span className="section-eyebrow">FORUM KOMUNITAS</span><h2 id="new-discussion-title">Mulai percakapan</h2><p>Bagikan cerita atau pertanyaan kepada komunitas pasar.</p><form onSubmit={submit}><label htmlFor="topic-title">Judul diskusi</label><input id="topic-title" autoFocus value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Apa yang ingin kamu ceritakan?" maxLength={90} /><label htmlFor="topic-category">Pilih sektor</label><select id="topic-category" value={category} onChange={(event) => setCategory(event.target.value)}>{filters.slice(1).map((filter) => <option key={filter}>{filter}</option>)}</select><label htmlFor="topic-body">Cerita atau pertanyaan</label><textarea id="topic-body" value={body} onChange={(event) => setBody(event.target.value)} placeholder="Tulis cerita dan pertanyaanmu di sini..." rows={5} maxLength={500} />{error && <span className="form-error">{error}</span>}<button className="button-small-primary modal-submit" type="submit"><Send size={13} /> Terbitkan Diskusi</button></form></section>
    </div>
  )
}

export default function ForumPage() {
  const [topics, setTopics] = useState(startTopics)
  const [activeFilter, setActiveFilter] = useState('Semua')
  const [sortMode, setSortMode] = useState('Terbaru')
  const [isComposerOpen, setComposerOpen] = useState(false)
  const [votedTopics, setVotedTopics] = useState([])
  const showToast = useToast()
  const visibleTopics = useMemo(() => {
    const filtered = topics.filter((topic) => activeFilter === 'Semua' || topic.category === activeFilter)
    return sortMode === 'Populer' ? [...filtered].sort((a, b) => b.votes - a.votes) : filtered
  }, [activeFilter, sortMode, topics])

  const addTopic = (newTopic) => {
    setTopics((current) => [{ ...newTopic, initials: 'AP', author: 'Aulia Putri', age: 'Baru saja', votes: 0, replies: 0, color: 'mint' }, ...current])
    setComposerOpen(false)
    showToast('Diskusi berhasil diterbitkan.')
  }
  const vote = (title) => {
    const hasVoted = votedTopics.includes(title)
    setVotedTopics((current) => hasVoted ? current.filter((item) => item !== title) : [...current, title])
    setTopics((current) => current.map((topic) => topic.title === title ? { ...topic, votes: topic.votes + (hasVoted ? -1 : 1) } : topic))
  }

  return (
    <div className="page-content forum-page">
      <PageHeader title="Forum Komunitas" section="RUANG BERSAMA SPLENDID" description="Cerita, pertanyaan, dan inspirasi dari sesama pencinta pasar." actions={<button className="button-small-primary" type="button" onClick={() => setComposerOpen(true)}><Plus size={13} /> Buat Diskusi Baru</button>} />
      <section className="forum-welcome"><span className="forum-welcome-icon"><MessageCircle size={20} /></span><span><strong>Hobi yang sama. Cerita yang berbeda.</strong><small>Mulai percakapan dan tumbuh bersama komunitas Splendid.</small></span><span className="forum-member-count"><strong>340</strong><small>anggota aktif</small></span></section>
      <div className="forum-content-grid">
        <section className="forum-main-column">
          <div className="forum-toolbar"><div className="forum-filter-tabs" role="tablist" aria-label="Filter diskusi">{filters.map((filter) => <button type="button" role="tab" aria-selected={filter === activeFilter} className={`forum-filter ${filter === activeFilter ? 'is-active' : ''}`} onClick={() => setActiveFilter(filter)} key={filter}>{filter}</button>)}</div><label className="forum-sort">Urutkan:<select value={sortMode} onChange={(event) => setSortMode(event.target.value)}><option>Terbaru</option><option>Populer</option></select><ChevronDown size={12} /></label></div>
          <p className="forum-result-count">Diskusi <strong>{visibleTopics.length}</strong> · Sektor {activeFilter}</p>
          <div className="forum-topic-list">
            {visibleTopics.map((topic) => { const voted = votedTopics.includes(topic.title); return <article className="forum-topic-card" key={topic.title}><div className={`avatar topic-avatar avatar-${topic.color}`}>{topic.initials}</div><div className="topic-main"><div className="topic-meta"><span className="topic-author">{topic.author}</span><span>·</span><span>{topic.age}</span><span className="discussion-tag">{topic.category}</span><button className="icon-button topic-more" aria-label="Pilihan diskusi" type="button" onClick={() => showToast('Pilihan diskusi: bagikan atau simpan.') }><MoreHorizontal size={16} /></button></div><h2>{topic.title}</h2><p>{topic.body}</p><div className="topic-actions"><button className={`topic-vote ${voted ? 'has-voted' : ''}`} type="button" onClick={() => vote(topic.title)}><ArrowUp size={12} /> {topic.votes} apresiasi</button><button type="button" onClick={() => showToast(`Diskusi “${topic.title}” siap dibuka.`)}><MessageCircle size={12} /> {topic.replies} balasan</button><button type="button" onClick={() => showToast('Tautan diskusi disalin.') }><Share2 size={11} /> Bagikan</button><button className="topic-love" type="button" aria-label="Simpan diskusi" onClick={() => showToast('Diskusi disimpan.') }><Heart size={13} /></button></div></div></article>})}
            {visibleTopics.length === 0 && <div className="empty-forum">Belum ada diskusi di sektor ini. Jadilah yang pertama memulai.</div>}
          </div>
          <button className="load-more" type="button" onClick={() => showToast('Semua diskusi terbaru sudah ditampilkan.')}>Lihat diskusi lainnya <ArrowRightIcon /></button>
        </section>
        <aside className="forum-side-column"><section className="community-card"><img src="/media/market/flower-hero.jpg" alt="Suasana Pasar Splendid" /><div><span className="section-eyebrow">KOMUNITAS SPLENDID</span><h2>Kenalan, yuk!</h2><p>Berbagi pengetahuan, pengalaman, dan cerita seru di pasar.</p><button className="text-button" type="button" onClick={() => showToast('Selamat datang di komunitas Splendid!')}>Pelajari tentang komunitas <ChevronRight size={12} /></button></div></section><section className="community-rules"><h3>Ruang yang ramah</h3><p><ShieldCheck size={13} /> Saling menghargai</p><p><ShieldCheck size={13} /> Berbagi dengan jujur</p><p><ShieldCheck size={13} /> Jaga keamanan</p><span>Etika percakapan berlaku untuk seluruh anggota.</span></section><section className="find-community"><h3>Temukan komunitas Anda</h3>{[['Burung','/admin/pasar/burung'],['Ikan Hias','/admin/pasar/ikan-hias'],['Bunga','/admin/pasar/bunga'],['Hewan Peliharaan','/admin/pasar/hewan-peliharaan']].map(([name,to]) => <Link to={to} key={name}>{name}<ChevronRight size={12} /></Link>)}</section></aside>
      </div>
      <footer className="page-footer"><span>Pasar Splendid Malang · Ruang tumbuh untuk pasar dan komunitas.</span><span>Diskusi yang saling menghargai</span></footer>
      {isComposerOpen && <NewDiscussionModal onClose={() => setComposerOpen(false)} onSubmit={addTopic} />}
    </div>
  )
}

function ArrowRightIcon() {
  return <ChevronRight size={13} />
}
