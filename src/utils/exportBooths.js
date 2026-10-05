export function exportBoothsCsv(booths, marketName) {
  const columns = ['Nomor booth', 'Nama booth', 'Tenant', 'Area', 'Kategori', 'Status']
  const rows = booths.map((booth) => [booth.id, booth.name, booth.tenant, booth.area, booth.category, booth.status])
  const csv = [columns, ...rows]
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
    .join('\r\n')
  const file = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')

  link.href = url
  link.download = `daftar-booth-${marketName.toLocaleLowerCase('id').replaceAll(' ', '-')}.csv`
  link.click()
  URL.revokeObjectURL(url)
}
