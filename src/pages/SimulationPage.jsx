import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { readSimulationFile, importSimulation } from '../services/simulationService'
import { formatMoney } from '../utils/formatters'
export default function SimulationPage() {
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const lock = useRef(false)
  const selection = useRef(0)
  async function read(event) {
    const file = event.target.files?.[0]
    const token = ++selection.current
    setPreview(null); setError(''); setMessage('')
    if (!file) return
    try {
      const parsed = await readSimulationFile(file)
      if (token === selection.current) setPreview(parsed)
    } catch (error) { if (token === selection.current) setError(error.message) }
  }
  async function importData() {
    if (lock.current || !preview) return
    lock.current = true; setBusy(true); setError(''); setMessage('')
    try {
      const result = await importSimulation(preview.invoices, (saved, total) => setMessage(`Importando ${saved} de ${total} facturas…`))
      setMessage(`Importación completa: ${result.saved} agregadas; ${result.skipped} omitidas por número existente.`)
      setPreview(null)
    } catch (error) { setMessage(''); setError(error.message) } finally { lock.current = false; setBusy(false) }
  }
  return <><div className="page-heading"><div><div className="eyebrow">LABORATORIO DE DEMOSTRACIÓN</div><h1>Un año de ventas, en un archivo</h1><p>Carga datos ficticios para presentar los resultados de un negocio.</p></div><span className="badge">Simulación</span></div>
    <section className="analytics-hero"><div><h2>Tu próxima presentación<br />empieza aquí.</h2><p>12 meses, clientes ficticios y ventas con variaciones estacionales.</p><a className="button secondary" href="/simulacion-facturas-2025.md" download="simulacion-facturas-2025.md">↓ Descargar ejemplo 2025</a></div><div className="hero-orbit" aria-hidden="true">12</div></section>
    <section className="panel import-panel"><h2>Importar archivo Markdown</h2><p>Usa la plantilla descargable. El archivo contiene un bloque JSON validado; no se ejecuta ni se interpreta HTML.</p><label className="upload-zone"><span>↥</span><strong>Selecciona tu archivo .md</strong><small>Máximo 2 MB · hasta 2000 facturas · USD</small><input type="file" accept=".md,text/markdown" aria-label="Archivo de simulación Markdown" disabled={busy} onChange={read} /></label>
    {preview && <div className="import-preview"><h2>Vista previa · {preview.year}</h2><div className="analytics-stats"><div className="stat"><span>Facturas</span><strong>{preview.summary.count}</strong></div><div className="stat"><span>Ventas sin impuestos</span><strong>{formatMoney(preview.summary.subtotal)}</strong></div><div className="stat"><span>Total con impuestos</span><strong>{formatMoney(preview.summary.total)}</strong></div></div><p>Se agregarán como simulación a db.json. No reemplaza tus facturas. Los números existentes se omiten.</p><button className="button" disabled={busy} onClick={importData}>{busy ? 'Importando…' : 'Importar facturas simuladas'}</button></div>}
    {error && <p className="message error" role="alert">{error}</p>}{message && <p className="message success" role="status">{message}</p>}<div className="actions"><Link className="back-link" to="/resumen">Ver gráficas →</Link></div></section></>
}
