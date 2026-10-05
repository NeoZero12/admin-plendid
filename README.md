# Pasar Splendid Malang

Web admin Pasar Splendid yang diselaraskan dengan sembilan referensi layar: login, dashboard, empat sektor pasar, forum komunitas, peta lokasi, dan pengaturan.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Halaman masuk: `/login`. Setelah menekan **Masuk**, aplikasi demo membuka `/admin/dashboard`.

## Checklist kriteria UTS

### A. Akurasi visual UI/UX — 30%

- [x] Komposisi login, navigasi gelap, dashboard, kartu sektor, forum, denah, dan pengaturan mengikuti referensi.
- [x] Foto kios lokal dari referensi dipakai sebagai aset lokal untuk banner dan kartu kategori.
- [x] Warna hijau, status aktif, tipografi, ikon, kartu, jarak, dan keadaan terpilih dijaga konsisten.

### B. Responsif — 25%

- [x] Breakpoint 1160 px, 900 px, 700 px, dan 520 px mengatur ulang sidebar, grid kartu, panel, dan form.
- [x] Kartu kategori turun dari empat ke tiga lalu dua kolom; forum dan peta menumpuk pada layar kecil.
- [x] Sidebar beralih ke navigasi ikon dan kontrol tetap bisa digunakan pada layar sempit.
- [ ] Pemeriksaan visual langsung di emulator ponsel/tablet masih perlu dilakukan sebelum pengumpulan.

### C. Struktur kode — 20%

- [x] Halaman, layout, komponen pasar, komponen peta, data kategori, hooks, dan utilitas dipisahkan per tanggung jawab.
- [x] Routing admin memakai React Router dan halaman sektor menggunakan komponen kategori yang dapat dipakai ulang.

### D. Implementasi materi — 25%

- [x] Routing tersedia untuk login, dashboard, empat sektor, forum, denah, dan pengaturan.
- [x] Interaksi tersedia: validasi form, filter/pencarian/pengurutan kios, favorit, pembuatan diskusi, apresiasi, pemilihan kios, zoom peta, dan pengaturan profil.
- [x] Toast memberi umpan balik untuk aksi. Konten pasar dan akun masih berupa data demo sisi klien; backend dan penyimpanan permanen belum dihubungkan.

## Pemeriksaan kode

`npm run lint` dan `npm run build` memeriksa kode dan build produksi.
