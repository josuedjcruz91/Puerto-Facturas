import { formatMoney } from '../../utils/formatters'
import { periodLabel } from '../../utils/analytics'
export default function SalesChart({ groups, period, metric, currency = 'USD' }) {
  const peak = Math.max(1, ...groups.map(group => group[metric]))
  const max = metric === 'count' ? Math.ceil(peak / 4) * 4 : peak
  const width = Math.max(720, groups.length * 44)
  const step = (width - 80) / Math.max(1, groups.length)
  const value = n => metric === 'count' ? `${n} facturas` : formatMoney(n, currency)
  if (!groups.length) return <p className="empty">Aún no hay datos para graficar.</p>
  return <div className="chart-scroll"><svg viewBox={`0 0 ${width} 290`} style={{ minWidth: width }} role="img" aria-label={metric === 'count' ? 'Cantidad de facturas por período. Valores disponibles en la tabla inferior.' : 'Ventas por período. Valores disponibles en la tabla inferior.'}>
    {[0, 1, 2, 3, 4].map(n => <g key={n}><line x1="64" y1={230 - n * 50} x2={width - 10} y2={230 - n * 50} className="chart-grid" /><text x="56" y={234 - n * 50} textAnchor="end" className="chart-axis">{new Intl.NumberFormat('es', { notation: 'compact', maximumFractionDigits: 1 }).format(max * n / 4)}</text></g>)}
    {groups.map((group, i) => { const h = group[metric] / max * 200; return <g key={group.key} tabIndex="0" aria-label={`${periodLabel(group.key, period)}: ${value(group[metric])}`}><title>{group.key}: {value(group[metric])}</title><rect x={70 + i * step} y={230 - h} width={Math.max(8, step - 16)} height={Math.max(0, h)} rx="5" className="chart-bar" /><text x={70 + i * step + (step - 16) / 2} y="254" textAnchor="middle" className="chart-axis">{periodLabel(group.key, period).replace('Semana ', '')}</text></g> })}
  </svg></div>
}
