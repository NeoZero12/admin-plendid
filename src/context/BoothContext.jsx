import { useState } from 'react'
import { createBoothId, initialBooths } from '../data/booths'
import { BoothContext } from './booth-context'

export function BoothProvider({ children }) {
  const [booths, setBooths] = useState(initialBooths)

  const addBooth = ({ name, area }) => {
    const createdBooth = {
      id: createBoothId(booths, area),
      name: name.trim(),
      tenant: '—',
      category: 'Belum ditentukan',
      area,
      status: 'Kosong',
      color: 'sand',
    }
    setBooths((currentBooths) => [...currentBooths, createdBooth])
    return createdBooth
  }

  return <BoothContext.Provider value={{ booths, addBooth }}>{children}</BoothContext.Provider>
}
