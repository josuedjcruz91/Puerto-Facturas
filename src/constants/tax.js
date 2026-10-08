// Opciones para facturas nuevas. No incluye tarifas transitorias reservadas para notas.
// Fuente: Hacienda, Anexos y estructuras v4.4, nota 8.1.
export const TAX_RATE = 0.13
export const TAX_OPTIONS = [
  { code: '08', rate: 0.13, label: 'IVA 13% · General' },
  { code: '04', rate: 0.04, label: 'IVA 4% · Reducido' },
  { code: '03', rate: 0.02, label: 'IVA 2% · Reducido' },
  { code: '02', rate: 0.01, label: 'IVA 1% · Reducido' },
  { code: '09', rate: 0.005, label: 'IVA 0,5% · Reducido' },
  { code: '01', rate: 0, label: 'IVA 0% · Crédito pleno' },
  { code: '10', rate: 0, label: 'Exento' },
  { code: '11', rate: 0, label: '0% · Sin derecho a crédito' },
]
export function taxSnapshot(code = '08') {
  const option = TAX_OPTIONS.find(option => option.code === code)
  if (!option) throw new Error('Selecciona una tarifa de IVA válida.')
  return { taxCode: option.code, taxRate: option.rate, taxLabel: option.label }
}
