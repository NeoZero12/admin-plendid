export const initialBooths = [
  { id: 'A-01', name: 'Kios Sumber Rejeki', tenant: 'Rina Puspita', category: 'Tanaman hias', area: 'Blok A', status: 'Terisi', color: 'mint' },
  { id: 'A-02', name: 'Flora Indah', tenant: 'Dewi Anggraini', category: 'Bunga potong', area: 'Blok A', status: 'Terisi', color: 'blue' },
  { id: 'A-03', name: 'Kios Bunga Melati', tenant: '—', category: 'Bunga potong', area: 'Blok A', status: 'Kosong', color: 'sand' },
  { id: 'A-04', name: 'Taman Kita', tenant: 'Fajar Nugraha', category: 'Perlengkapan', area: 'Blok A', status: 'Terisi', color: 'lilac' },
  { id: 'A-05', name: 'Bloom House', tenant: '—', category: 'Tanaman hias', area: 'Blok A', status: 'Kosong', color: 'sand' },
  { id: 'A-06', name: 'Kios Anggrek', tenant: 'Maya Lestari', category: 'Tanaman hias', area: 'Blok A', status: 'Terisi', color: 'mint' },
  { id: 'B-01', name: 'Daun & Dahan', tenant: 'Siti Nurhaliza', category: 'Tanaman hias', area: 'Blok B', status: 'Terisi', color: 'blue' },
  { id: 'B-02', name: 'Kebun Mini', tenant: '—', category: 'Perlengkapan', area: 'Blok B', status: 'Kosong', color: 'sand' },
  { id: 'B-03', name: 'Rumah Kaktus', tenant: 'Arif Setiawan', category: 'Tanaman hias', area: 'Blok B', status: 'Terisi', color: 'lilac' },
  { id: 'B-04', name: 'Pojok Akar', tenant: 'Wulan Sari', category: 'Perlengkapan', area: 'Blok B', status: 'Terisi', color: 'mint' },
  { id: 'B-05', name: 'Kios Kenanga', tenant: '—', category: 'Bunga potong', area: 'Blok B', status: 'Kosong', color: 'sand' },
  { id: 'B-06', name: 'Gardenia', tenant: 'Putri Ayu', category: 'Bunga potong', area: 'Blok B', status: 'Terisi', color: 'blue' },
]

export function createBoothId(booths, area) {
  const prefix = area.endsWith('A') ? 'A' : 'B'
  const highestNumber = booths.reduce((highest, booth) => {
    if (!booth.id.startsWith(`${prefix}-`)) return highest
    return Math.max(highest, Number(booth.id.slice(2)) || 0)
  }, 0)

  return `${prefix}-${String(highestNumber + 1).padStart(2, '0')}`
}
