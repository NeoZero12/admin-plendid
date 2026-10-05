export default function StatCard({ icon: Icon, tone = 'navy', value, suffix, unit, label, trend, progress = 100, className = '' }) {
  return (
    <article className={`stat-card ${className}`}>
      <div className="stat-card-top">
        <span className={`stat-icon stat-icon-${tone}`}><Icon size={18} /></span>
        {trend && <span className={`stat-trend ${tone === 'orange' ? 'trend-orange' : ''}`}>{trend}</span>}
      </div>
      <div className="stat-main"><strong>{value}{suffix && <span className="stat-percent">{suffix}</span>}</strong>{unit && <span>{unit}</span>}</div>
      <p>{label}</p>
      <div className="stat-progress"><span className={`progress-${tone}`} style={{ width: `${progress}%` }} /></div>
    </article>
  )
}
