// Presenta únicamente lo reportado por Hacienda; un campo ausente no equivale a «No».
export function fiscalValue(value) {
  return typeof value === 'string' && value.trim() ? value.trim() : typeof value === 'number' || typeof value === 'boolean' ? String(value) : 'No informado'
}
export function fiscalFlag(value) {
  const normalized = typeof value === 'string' ? value.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase() : value
  if (normalized === 'SI' || normalized === true) return { label: 'Sí', state: 'warning' }
  if (normalized === 'NO' || normalized === false) return { label: 'No', state: 'clear' }
  return { label: fiscalValue(value), state: 'unknown' }
}
export function taxpayerSummary(data) {
  const situation = data?.situacion
  return {
    found: typeof data?.nombre === 'string' && Boolean(data.nombre.trim()),
    name: fiscalValue(data?.nombre), type: fiscalValue(data?.tipoIdentificacion),
    status: fiscalValue(situation?.estado), moroso: fiscalFlag(situation?.moroso), omiso: fiscalFlag(situation?.omiso),
    administration: fiscalValue(situation?.administracionTributaria),
    regime: fiscalValue(data?.regimen?.descripcion), regimeCode: fiscalValue(data?.regimen?.codigo),
    activities: Array.isArray(data?.actividades) ? data.actividades.map(activity => ({ code: fiscalValue(activity?.codigo), description: fiscalValue(activity?.descripcion), state: fiscalValue(activity?.estado), type: fiscalValue(activity?.tipo) })) : [],
  }
}
export function consultationDate(value) {
  const date = new Date(value)
  return value && Number.isFinite(date.getTime()) ? new Intl.DateTimeFormat('es-CR', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/Costa_Rica' }).format(date) : 'Fecha no disponible'
}
