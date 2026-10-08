import Icon from '../ui/Icon'
export default function MetricCard({ label, value, helper, icon = 'chart', tone = '' }) {
 return <article className={`stat metric-card ${tone}`}><div className="metric-label"><span>{label}</span><Icon name={icon} /></div><strong>{value}</strong><small>{helper}</small></article>
}
