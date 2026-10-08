export default function BrandLogo({ compact = false }) {
  return <span className="brand-logo"><img src="/puerto-factura-icon.svg" width="48" height="48" alt="" />{!compact && <span>PUERTO<strong>FACTURA</strong></span>}</span>
}
