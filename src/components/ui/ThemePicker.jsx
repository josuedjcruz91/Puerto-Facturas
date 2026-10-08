import { useEffect, useState } from 'react'
const themes = [{ id: 'blue-light', label: 'Océano', color: '#347dbe' }, { id: 'green-white', label: 'Marea', color: '#278870' }, { id: 'red-dark', label: 'Faro', color: '#ed8d82' }]
export default function ThemePicker() {
  const [theme, setTheme] = useState(() => { try { const saved = localStorage.getItem('invoice-theme'); return themes.some(t => t.id === saved) ? saved : 'blue-light' } catch { return 'blue-light' } })
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem('invoice-theme', theme) } catch { /* El tema funciona sin persistencia. */ } }, [theme])
  return <div className="theme-picker" role="group" aria-label="Tema visual">{themes.map(t => <button key={t.id} type="button" aria-label={t.label} aria-pressed={theme === t.id} title={`Tema ${t.label}`} onClick={() => setTheme(t.id)}><i style={{ background: t.color }} /><span>{t.label}</span></button>)}</div>
}
