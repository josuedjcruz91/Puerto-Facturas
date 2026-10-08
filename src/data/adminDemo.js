import { addDays } from '../utils/invoiceStatus.js'
import { monthOffset } from '../utils/adminAnalytics.js'
export function createAdminDemo(today) {
  const totals = [180, 210, 195, 2450, 220, 175, 205, 190]
  const names = ['Juan Pérez', 'María Vargas', 'Carlos Mora', 'Comercial Horizonte S.A.']
  return totals.map((total, i) => {
    const date = `${monthOffset(today.slice(0, 7), -(3 - i % 3))}-05`
    return { number: `ADMIN-DEMO-${String(i + 1).padStart(3, '0')}`, date, dueDate: i < 2 ? addDays(today, -(15 - i * 12)) : i === 2 ? addDays(today, 7) : addDays(date, 30), paidAt: i > 2 ? `${addDays(date, 10)}T12:00:00Z` : null, currency: 'USD', taxRate: 0, taxCode: '10', issuer: { name: 'TechStore S.A.', identification: '3101123456' }, customer: { name: names[i % 4], identification: `10111000${i % 4 + 1}`, identificationType: 'fisica' }, items: [{ id: `demo-item-${i}`, description: 'Servicio de demostración', quantity: 1, unitPrice: total, taxRate: 0, taxCode: '10' }], source: 'simulation', demoGroup: 'admin-rubric', terms: 'Datos ficticios del reto administrativo. Sin validez fiscal.' }
  })
}
