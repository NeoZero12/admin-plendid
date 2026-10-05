import { useState } from 'react'
import { Check, ChevronDown, MapPin, Store } from 'lucide-react'
import { markets } from '../../data/markets'

export default function MarketSelector({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const chooseMarket = (market) => {
    onChange(market)
    setIsOpen(false)
  }

  return (
    <div className="market-picker-wrap">
      <button className={`market-picker ${isOpen ? 'is-open' : ''}`} type="button" aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>
        <span className="market-picker-icon"><MapPin size={16} /></span>
        <span className="market-picker-copy"><small>PILIH PASAR</small><strong>{value}</strong></span>
        <ChevronDown size={15} />
      </button>
      {isOpen && (
        <div className="market-menu" role="listbox" aria-label="Pilih pasar">
          {markets.map((market) => (
            <button type="button" role="option" aria-selected={market === value} key={market} onClick={() => chooseMarket(market)}>
              <span className="market-menu-icon"><Store size={15} /></span>{market}
              {market === value && <Check size={15} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
