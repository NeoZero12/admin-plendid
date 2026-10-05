import { ChevronRight, Store } from 'lucide-react'

export default function PageHeader({ eyebrow = 'MANAJEMEN PASAR', section = 'ADMINISTRASI', title, description, actions }) {
  return (
    <>
      <div className="mobile-brand"><span className="brand-mark"><Store size={18} /></span><strong>pasar<span>splendid</span></strong></div>
      <div className="page-heading-row">
        <div className="page-heading">
          <div className="eyebrow"><span className="eyebrow-dot" /> {eyebrow} <ChevronRight size={12} /> {section}</div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {actions && <div className="heading-actions">{actions}</div>}
      </div>
    </>
  )
}
