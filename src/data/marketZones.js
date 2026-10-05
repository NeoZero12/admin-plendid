import { Bird, Flower2, PawPrint, Shell } from 'lucide-react'

export const marketZones = [
  { id: 'A', name: 'Burung', route: 'burung', icon: Bird, className: 'zone-bird', booths: ['A-01', 'A-02', 'A-03', 'A-04', 'A-05', 'A-06'] },
  { id: 'B', name: 'Ikan Hias', route: 'ikan-hias', icon: Shell, className: 'zone-fish', booths: ['B-01', 'B-02', 'B-03', 'B-04', 'B-05', 'B-06'] },
  { id: 'C', name: 'Bunga', route: 'bunga', icon: Flower2, className: 'zone-flower', booths: ['C-01', 'C-02', 'C-03', 'C-04', 'C-05', 'C-06'] },
  { id: 'D', name: 'Hewan Peliharaan', route: 'hewan-peliharaan', icon: PawPrint, className: 'zone-pet', booths: ['D-01', 'D-02', 'D-03', 'D-04', 'D-05', 'D-06'] },
]
