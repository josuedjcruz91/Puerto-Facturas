import { consultationDate, taxpayerSummary } from '../../utils/taxpayer'
export default function TaxpayerStatus({ data, checkedAt, historical = false }) {
  const summary = taxpayerSummary(data)
  const warnings = [summary.moroso.state === 'warning' && 'morosidad', summary.omiso.state === 'warning' && 'omisión'].filter(Boolean)
  if (!data) return <section className="taxpayer-panel"><h3>Consulta de Hacienda</h3><p>Esta factura no tiene una consulta fiscal guardada.</p></section>
  return <section className="taxpayer-panel" aria-label="Información tributaria de Hacienda">
    <div className="taxpayer-heading"><div><h3>Información tributaria</h3><p>{historical ? 'Consulta guardada con la factura' : 'Datos obtenidos de Hacienda'} · {consultationDate(checkedAt)} (Costa Rica)</p></div><span className="badge">{summary.found ? 'Registro encontrado' : 'Registro no confirmado'}</span></div>
    <dl className="taxpayer-grid">
      <div><dt>Estado de inscripción</dt><dd>{summary.status}</dd></div>
      <div className={`fiscal-${summary.moroso.state}`}><dt>Moroso</dt><dd>{summary.moroso.label}</dd></div>
      <div className={`fiscal-${summary.omiso.state}`}><dt>Omiso</dt><dd>{summary.omiso.label}</dd></div>
      <div><dt>Tipo de identificación</dt><dd>{summary.type}</dd></div>
      <div><dt>Régimen tributario</dt><dd>{summary.regime}<small>Código: {summary.regimeCode}</small></dd></div>
      <div><dt>Administración tributaria</dt><dd>{summary.administration}</dd></div>
    </dl>
    {warnings.length > 0 && <p role="alert" className="taxpayer-warning">Hacienda reporta {warnings.join(' y ')} para este cliente. Revisa su situación. Esta advertencia no bloquea el guardado de la factura.</p>}
    <h4>Actividades económicas</h4>{summary.activities.length ? <div className="table-scroll"><table><thead><tr><th>Código</th><th>Descripción</th><th>Estado reportado</th><th>Tipo reportado</th></tr></thead><tbody>{summary.activities.map((activity, index) => <tr key={`${activity.code}-${index}`}><td>{activity.code}</td><td>{activity.description}</td><td>{activity.state}</td><td>{activity.type}</td></tr>)}</tbody></table></div> : <p>Hacienda no reportó actividades económicas en esta respuesta.</p>}
    <p className="taxpayer-note">Encontrar un registro no significa estar al día. Los datos no informados se muestran como tales; los códigos y estados conservan el valor reportado por Hacienda. {historical ? 'Esta es una copia histórica, no una consulta en tiempo real.' : 'Las consultas pueden reutilizarse durante 10 minutos; la fecha corresponde a la respuesta original.'}</p>
    <details className="taxpayer-extra"><summary>Ver toda la información recibida</summary><pre>{JSON.stringify(data, null, 2)}</pre></details>
  </section>
}
